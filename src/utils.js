export const URL_INFO = 'https://codeforces.com/api/user.info?handles='
export const URL_rating = 'https://codeforces.com/api/user.rating?handle='
const UserJU = [
  'voldemort713',
  'vikash485',
  'srayan',
  'sailikpandey',
  'ayushpandit',
  'om_mittal7',
  'Anupam_Ghosh',
  'Tuhin11',
  'Bibaswan27',
  'hushthenoise',
  'jishudip',
  'arka_roy',
  'twoplusthree',
  'WillSee',
  'CP_Arijeet',
]

const fetch_retry = async (url, n) => {
  for (let i = 0; i < n; i++) {
    let resp = await fetch(url)
    if (resp.ok) return resp.json()
    if (resp.status === 400)
      return Promise.reject(new Error('Invalid handles!'))
  }
  return Promise.reject(new Error(`still failed after ${n} times of trying`))
}

export const getUserData = (handles, setUsers) => {
  setUsers([])
  // let handlesForURL = handles.replaceAll('\n', ';')
  for (var i = 0; i < UserJU.length; i++) {
    fetch(URL_INFO + UserJU[i])
      .then((response) => {
        if (response.ok) return response.json()
        else if (response.status === 400) {
          return Promise.reject(new Error('Invalid handles!'))
        }
      })
      .then(
        (data) => {
          // console.log(data.result)
          setUsers(data.result)
        },
        (result) => {
          console.log('Error: ' + result)
        }
      )
  }
}

export const getRatings = async (handlesStr, setDatasets, setProgress) => {
  let ratings = []
  let invalidHandles = []
  const handles = handlesStr.split('\n')
  setDatasets([])
  setProgress({ done: 0, total: handles.length })
  let cnt = 0
  for (var i = 0; i < UserJU.length; i++) {
    await fetch_retry(URL_rating + UserJU[i], 10).then(
      (data) => {
        ratings.push(data.result)
      },
      (result) => {
        console.log('Error: ' + result)
      }
    )
    cnt++
    setProgress({ done: cnt, total: UserJU.length })
  }
  if (invalidHandles.length !== 0) {
    alert(`${invalidHandles.join(', ')} are invalid handle(s)!`)
    setDatasets([])
    return
  }
  // console.log(newRatings)
  setDatasets(makeDataset(ratings))
}

const colorSchemeOri = [
  '#25CCF7',
  '#FD7272',
  '#54a0ff',
  '#00d2d3',
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d',
  '#55efc4',
  '#81ecec',
  '#74b9ff',
  '#a29bfe',
  '#00b894',
  '#00cec9',
  '#0984e3',
  '#6c5ce7',
  '#ffeaa7',
  '#fab1a0',
  '#ff7675',
  '#fd79a8',
  '#fdcb6e',
  '#e17055',
  '#d63031',
  '#feca57',
  '#5f27cd',
  '#54a0ff',
  '#01a3a4',
]

const makeDataset = (ratings) => {
  const colorScheme = colorSchemeOri.slice()
  const dataset = []
  for (const rating of ratings) {
    if (rating.length === 0) continue
    const color = colorScheme.pop()
    const data = {
      // backgroundColor: color,
      borderColor: color,
      label: rating[0].handle,
      data: [],
      parsing: false,
    }
    for (const contest of rating) {
      data.data.push({
        x: contest.ratingUpdateTimeSeconds * 1000,
        y: contest.newRating,
      })
    }
    dataset.push(data)
  }
  // console.log(dataset)
  return dataset
}

export function ratingToColor(rating) {
  if (rating === undefined) return 'user-black'
  if (rating < 1200) return 'user-gray'
  if (rating < 1400) return 'user-green'
  if (rating < 1600) return 'user-cyan'
  if (rating < 1900) return 'user-blue'
  if (rating < 2100) return 'user-violet'
  if (rating < 2400) return 'user-orange'
  if (rating < 2600) return 'user-fire'
  if (rating < 3000) return 'user-red'
  return 'user-legendary'
}

// vim:tabstop=2:shiftwidth=2
