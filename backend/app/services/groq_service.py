import json
import os
import re
import logging
from typing import Dict, Any
from app.core.config import settings

logger = logging.getLogger("devforge.groq")

SYSTEM_PROMPT = """You are DevForge AI, an elite Principal Software Engineer.
Generate a complete, production-ready starter project repository based on the prompt.

INSTRUCTIONS:
1. Include all core files: source code, Dockerfile, docker-compose.yml, README.md, .gitignore, and config files.
2. Return ONLY raw valid JSON matching this exact schema:
{
  "projectName": "project-slug",
  "architecture": "Architecture summary and setup instructions",
  "files": [
    {"path": "app/main.py", "content": "..."},
    {"path": "Dockerfile", "content": "..."}
  ]
}
No markdown fences, no extra text. Output valid JSON only.
"""

class GroqService:
    def __init__(self, api_key: str = None, model: str = None):
        raw_key = api_key or settings.GROQ_API_KEY or os.getenv("GROQ_API_KEY", "")
        self.api_key = str(raw_key).strip().strip('"').strip("'")
        self.model = model or getattr(settings, "GROQ_MODEL", "llama-3.3-70b-versatile")

    def generate_project_json(self, prompt: str) -> Dict[str, Any]:
        """
        Sends the user prompt to the Groq AI API using official Groq SDK.
        Enforces structured JSON response containing generated files.
        Raises an error if GROQ_API_KEY is missing or if generation fails.
        """
        if not self.api_key or self.api_key == "":
            raise ValueError(
                "GROQ_API_KEY is missing or empty. "
                "Please add a valid GROQ_API_KEY to backend/.env or enter your API key in the Settings tab."
            )

        logger.info(f"Dispatching prompt to Groq API ({self.model}) for project generation...")

        try:
            from groq import Groq, APIError, AuthenticationError, RateLimitError, APIConnectionError, InternalServerError
        except ImportError:
            raise RuntimeError(
                "Groq SDK is not installed. Please run 'pip install groq' in your backend environment."
            )

        try:
            client = Groq(api_key=self.api_key)
            completion = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.2,
                max_tokens=8192
            )

            raw_text = completion.choices[0].message.content

        except AuthenticationError as e:
            logger.error(f"Groq Authentication Error (401/403): {e}")
            raise ValueError(
                "Invalid Groq API Key. Groq rejected the credentials. "
                "Please get an API key from https://console.groq.com/keys and update Settings or backend/.env."
            )
        except RateLimitError as e:
            logger.error(f"Groq Rate Limit Error (429): {e}")
            raise RuntimeError(
                "Groq API rate limit reached (429 Too Many Requests). "
                "Please wait a few seconds and try again, or upgrade your Groq API quota."
            )
        except APIConnectionError as e:
            logger.error(f"Groq Connection / Timeout Error: {e}")
            raise RuntimeError(
                "Connection error or timeout communicating with Groq API. "
                "Please check your internet connection and verify Groq servers status."
            )
        except InternalServerError as e:
            logger.error(f"Groq Server Error (500): {e}")
            raise RuntimeError(
                "Groq AI service encountered an internal server error (500). "
                "Please try again in a few moments."
            )
        except APIError as e:
            logger.error(f"Groq API Error: {e}")
            raise RuntimeError(f"Groq API error ({e.status_code}): {e.message}")
        except Exception as e:
            logger.error(f"Unexpected Groq client error: {e}")
            raise RuntimeError(f"Groq API request failed: {str(e)}")

        if not raw_text or not raw_text.strip():
            raise RuntimeError("Received an empty response from Groq API.")

        cleaned_json = self._clean_json_text(raw_text)
        try:
            parsed = json.loads(cleaned_json)
        except json.JSONDecodeError as err:
            logger.error(f"Failed to parse Groq output as JSON: {raw_text[:200]}...")
            raise RuntimeError(f"Groq AI output was not valid JSON: {str(err)}")

        if "files" not in parsed or not isinstance(parsed["files"], list) or len(parsed["files"]) == 0:
            raise RuntimeError("Groq AI response did not contain a valid 'files' array.")

        return parsed

    def _clean_json_text(self, text: str) -> str:
        """Removes markdown code fences (```json ... ```) if present in Groq output."""
        text = text.strip()
        if text.startswith("```"):
            lines = text.splitlines()
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].startswith("```"):
                lines = lines[:-1]
            text = "\n".join(lines).strip()
        return text
