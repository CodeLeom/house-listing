function Footer() {
    const aYear = new Date().getFullYear()
  return (
      <footer className='footer h-10 footer-center p-4 bg-base-300 text-base-content'>
          <div>
              <p>
                  House Listing Application &copy; {aYear}. All right Reserved. 
              </p>
          </div>
      </footer>
  )
}

export default Footer