import { server } from "./server.js"

const form = document.getElementById("form")
const url = document.getElementById("url")
const paragraph = document.getElementById("content")

form.addEventListener("submit", async e => {
  e.preventDefault()
  paragraph.classList.add("promptSelect")
  paragraph.classList.remove("resumeColor")

  const videoURL = url.value

  if (!videoURL.includes("shorts")) {
    return (paragraph.textContent =
      "Este conteúdo não pertence a um Short, insira outra URL!")
  }

  const [_, paramsId] = videoURL.split("/shorts/")
  const [videoId] = paramsId.split("?si")

  paragraph.textContent = "Obtendo o conteúdo do Shorts..."

  const transcription = await server.get("/summary/" + videoId)

  paragraph.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary/", {
    text: transcription.data.result
  })

  paragraph.textContent = summary.data.result
  paragraph.classList.add("resumeColor")
  paragraph.classList.remove("promptSelect")
})
