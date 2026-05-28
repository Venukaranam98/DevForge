import { useState, useEffect } from "react"

import axios from "axios"


function App() {

  const [projectName, setProjectName] = useState("")

  const [frontend, setFrontend] = useState("React")

  const [backend, setBackend] = useState("FastAPI")

  const [database, setDatabase] = useState("PostgreSQL")

  const [projectType, setProjectType] = useState("Basic Starter")

  const [loading, setLoading] = useState(false)

  const [success, setSuccess] = useState("")

  const [history, setHistory] = useState([])


  useEffect(() => {

    fetchHistory()

  }, [])


  const fetchHistory = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:8000/history"

      )

      setHistory(response.data.data)

    }

    catch (error) {

      console.log(error)

    }

  }


  const generateProject = async () => {

    if (!projectName) {

      alert("Enter project name")

      return

    }

    try {

      setLoading(true)

      setSuccess("")

      const response = await axios.post(

        "http://127.0.0.1:8000/generate",

        {

          project_name: projectName,

          frontend,

          backend,

          database,

          project_type: projectType

        },

        {

          responseType: "blob"

        }

      )

      const url = window.URL.createObjectURL(

        new Blob([response.data])

      )

      const link = document.createElement("a")

      link.href = url

      link.setAttribute(

        "download",

        `${projectName}.zip`

      )

      document.body.appendChild(link)

      link.click()

      link.remove()

      setSuccess("Project generated successfully!")

      fetchHistory()

    }

    catch (error) {

      console.log(error)

      alert("Project generation failed")

    }

    finally {

      setLoading(false)

    }

  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-16">

          <h1 className="text-6xl font-bold mb-6">

            DevForge

          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">

            Professional Full Stack Project Generator supporting FastAPI, Node.js, React, Docker, Authentication Templates and more.

          </p>

        </div>


        <div className="grid lg:grid-cols-2 gap-10 items-start">

          <div className="bg-white text-black rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-6">

              Generate Project

            </h2>

            <div className="space-y-5">

              <input

                type="text"

                placeholder="Project Name"

                value={projectName}

                onChange={(e) => setProjectName(e.target.value)}

                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"

              />


              <select

                value={frontend}

                onChange={(e) => setFrontend(e.target.value)}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option>React</option>

              </select>


              <select

                value={backend}

                onChange={(e) => setBackend(e.target.value)}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option>FastAPI</option>

                <option>Node</option>

              </select>


              <select

                value={database}

                onChange={(e) => setDatabase(e.target.value)}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option>PostgreSQL</option>

                <option>MongoDB</option>

              </select>


              <select

                value={projectType}

                onChange={(e) => setProjectType(e.target.value)}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option>Basic Starter</option>

                <option>Auth API Starter</option>

                <option>CRUD API Starter</option>

                <option>AI API Starter</option>

              </select>


              {

                success && (

                  <div className="bg-green-100 text-green-700 p-3 rounded-xl text-center">

                    {success}

                  </div>

                )

              }


              <button

                onClick={generateProject}

                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-300"

              >

                {

                  loading

                  ?

                  "Generating..."

                  :

                  "Generate Project"

                }

              </button>

            </div>

          </div>


          <div className="space-y-6">

            <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6">

              <h3 className="text-2xl font-semibold mb-3">

                Multi Stack Support

              </h3>

              <p className="text-gray-400">

                Generate FastAPI and Node.js backend starter templates instantly.

              </p>

            </div>


            <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6">

              <h3 className="text-2xl font-semibold mb-3">

                Authentication Templates

              </h3>

              <p className="text-gray-400">

                Generate JWT authentication starter APIs with scalable architecture.

              </p>

            </div>


            <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6">

              <h3 className="text-2xl font-semibold mb-3">

                Docker Ready

              </h3>

              <p className="text-gray-400">

                Automatically generate Dockerfile and docker-compose setup.

              </p>

            </div>


            <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6">

              <h3 className="text-2xl font-semibold mb-3">

                Automatic Project Setup

              </h3>

              <p className="text-gray-400">

                DevForge automatically creates README, .env, package.json, requirements.txt and scalable folder structures.

              </p>

            </div>


            <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6">

              <h3 className="text-2xl font-semibold mb-3">

                Instant ZIP Downloads

              </h3>

              <p className="text-gray-400">

                Download generated starter projects instantly as production-ready ZIP packages.

              </p>

            </div>

          </div>

        </div>


        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">

            Recent Generated Projects

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {

              history.map((item, index) => (

                <div

                  key={index}

                  className="bg-gray-900 border border-gray-700 rounded-2xl p-5"

                >

                  <h3 className="text-2xl font-semibold mb-3">

                    {item.project_name}

                  </h3>

                  <p className="text-gray-400">

                    Backend: {item.backend}

                  </p>

                  <p className="text-gray-400">

                    Database: {item.database}

                  </p>

                  <p className="text-gray-400">

                    Type: {item.project_type}

                  </p>

                </div>

              ))

            }

          </div>

        </div>

      </div>

    </div>

  )

}


export default App