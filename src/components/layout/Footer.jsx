function Footer() {
    const aYear = new Date().getFullYear()
  return (
      <footer className='footer fixed inset-x-0 bottom-0 footer-center p-4 bg-base-300 text-base-content'>
          <div>
              <p>
                  House Listing Application &copy; {aYear}. All right Reserved. 
              </p>
          </div>
      </footer>
  )
}

export default Footer