import config from '../config'


const HelsingAPIService = {
  getAllStudies() {
    return fetch(`${config.API_ENDPOINT}/reservestudy`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getAllSustainment() {
    return fetch(`${config.API_ENDPOINT}/sustainment`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getAllTM() {
    return fetch(`${config.API_ENDPOINT}/timeandmaterial`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getAllEmployees() {
    return fetch(`${config.API_ENDPOINT}/employee`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getRSById(rsId) {
    return fetch(`${config.API_ENDPOINT}/reservestudy/${rsId}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getSustainmentById(sId) {
    return fetch(`${config.API_ENDPOINT}/sustainment/${sId}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getTMById(tmId) {
    return fetch(`${config.API_ENDPOINT}/timeandmaterial/${tmId}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getEmployeeById(eId) {
    return fetch(`${config.API_ENDPOINT}/employee/${eId}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  addReserveStudy(newRSInfo) {
    return fetch(`${config.API_ENDPOINT}/reservestudy`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...newRSInfo
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  addSustainment(newSustainmentInfo) {
    return fetch(`${config.API_ENDPOINT}/sustainment`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...newSustainmentInfo
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  addTM(newTMInfo) {
    return fetch(`${config.API_ENDPOINT}/timeandmaterial`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...newTMInfo
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  addEmployee(newEmployeeInfo) {
    return fetch(`${config.API_ENDPOINT}/employee`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...newEmployeeInfo
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateReserveStudy(rs_id, updatedInfo) {
    return fetch(`${config.API_ENDPOINT}/reservestudy/${rs_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...updatedInfo
      }),
    })
  },
  updateSustainment(s_id, updatedInfo) {
    return fetch(`${config.API_ENDPOINT}/sustainment/${s_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...updatedInfo
      }),
    })
  },
  updateTM(tm_id, updatedInfo) {
    return fetch(`${config.API_ENDPOINT}/sustainment/${tm_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...updatedInfo
      }),
    })
  },
  deleteReserveStudy(rs_id) {
    return fetch(`${config.API_ENDPOINT}/reservestudy/${rs_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  deleteSustainment(s_id) {
    return fetch(`${config.API_ENDPOINT}/sustainment/${s_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  deleteTM(tm_id) {
    return fetch(`${config.API_ENDPOINT}/timeandmaterial/${tm_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  deleteEmployee(e_id) {
    return fetch(`${config.API_ENDPOINT}/employee/${e_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }
}

export default HelsingAPIService