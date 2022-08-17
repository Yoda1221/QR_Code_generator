const qr    = document.getElementById('qrcode')
const form  = document.getElementById('generateForm')

const onGenerateSubmit = (e) => {
  e.preventDefault()
  clearUI()
  const url     = document.getElementById('url').value
  const size    = document.getElementById('size').value
  //**Validate url
  if (url === '') {
    alert('Please enter a URL')
  } else {
    showSpinner()
    setTimeout(() => {
      hideSpinner()
      generateQRCode(url, size)
      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src
        createSaveBtn(saveUrl)
      }, 50)
    }, 1000)
  }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
      text: url,
      width: size,
      height: size,
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    })
}
const clearUI = () => {
    qr.innerHTML = ''
    const saveBtn = document.getElementById('save-link')
    if (saveBtn) saveBtn.remove()
}
const showSpinner = () => {
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'block'
}
const hideSpinner = () => {
    const spinner = document.getElementById('spinner')
    spinner.style.display = 'none'
}
const createSaveBtn = (saveUrl) => {
    const link      = document.createElement('a');
    link.href       = saveUrl
    link.download   = 'qrcode'
    link.id         = 'save-link'
    link.innerHTML  = 'Save Image'
    link.classList  = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5'
    document.getElementById('generated').appendChild(link)
}
  
hideSpinner()

form.addEventListener('submit', onGenerateSubmit)
