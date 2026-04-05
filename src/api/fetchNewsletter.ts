export const useFetchNewsletters = () => {
  const baseURL = "/newsletters"

  const list = async () => {
    try {
      const data = await fetch(baseURL)
      if (!data.ok) {
        throw new Error(`Statut de réponse : ${data.status}`)
      }
      const result = data.json()
      console.dir("list result : ", result)
      return result
    } catch (err) {
      const error = new Error("Propblème pour lister les entreprises", {
        cause: err,
      })
      console.error(error)
    }
  }

  const retrieve = async (id: string) => {
    try {
      const data = await fetch(`${baseURL}/${id}`)
      if (!data.ok) {
        throw new Error(`Statut de réponse : ${data.status}`)
      }
      const result = data.json()
      console.dir("retrieve result : ", result)
      return result
    } catch (err) {
      const error = new Error(`Propblème pour récupérer l'entreprise ${id}`, {
        cause: err,
      })
      console.error(error.message)
    }
  }

  const create = async (body: FormData) => {
    try {
      const data = await fetch(`${baseURL}`, { body, method: "POST" })
      if (!data.ok) {
        throw new Error(`Statut de réponse : ${data.status}`)
      }
      const result = data.json()
      console.dir("create result : ", result)
      return result
    } catch (err) {
      const error = new Error("Propblème pour ajouter l'entreprise", {
        cause: err,
      })
      console.error(error.message)
    }
  }

  // Pour l'utilisateur dans un email ?
  const update = async (id: string, body: FormData) => {
    try {
      const data = await fetch(`${baseURL}`, { body, method: "PATCH" })
      if (!data.ok) {
        throw new Error(`Statut de réponse : ${data.status}`)
      }
      const result = data.json()
      console.dir("update result : ", result)
      return result
    } catch (err) {
      const error = new Error(
        `Propblème pour mettre à jour l'entreprise ${id}`,
        {
          cause: err,
        },
      )
      console.error(error.message)
    }
  }

  const del = async (id: string) => {
    try {
      const data = await fetch(`${baseURL}/${id}`, { method: "DELETE" })
      if (!data.ok) {
        throw new Error(`Statut de réponse : ${data.status}`)
      }
      const result = data.json()
      console.dir("del result : ", result)
      return result
    } catch (err) {
      const error = new Error(`Propblème pour supprimer l'entreprise ${id}`, {
        cause: err,
      })
      console.error(error.message)
    }
  }

  return { list, retrieve, create, update, del }
}
