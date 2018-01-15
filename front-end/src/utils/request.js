export const createGETRequest = ((url) => (
  new Request(url, {
                method: 'GET',
                headers: new Headers({
                  'Authorization': 'Ruchi'
                })
              })
))

export const createPOSTRequest = ((url,requestBody) => (
  new Request(url, {
                method: 'POST',
                headers: new Headers({
                  'Authorization': 'Ruchi',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }),
                body:JSON.stringify(requestBody)
              })
))

export const createPUTRequest = ((url,requestBody) => (
  new Request(url, {
                method: 'PUT',
                headers: new Headers({
                  'Authorization': 'Ruchi',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }),
                body:JSON.stringify(requestBody)
              })
))

export const createDELETERequest = ((url,requestBody) => (
  new Request(url, {
                method: 'DELETE',
                headers: new Headers({
                  'Authorization': 'Ruchi',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                })
              })
))
