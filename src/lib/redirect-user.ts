const redirectUserToIndex = () => {
  const user = localStorage.getItem('username')

  if (!user) {
    window.location.href = '/'
  }
}

export {redirectUserToIndex}