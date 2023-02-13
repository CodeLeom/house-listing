function Footer() {
    const aYear = new Date().getFullYear()
  return (
    <footer className='navbar mt-5 fixed-bottom navbar-dark bg-primary text-white'>
        <div>
            <p>
                House Listing Application &copy; {aYear}. All right Reserved. 
            </p>
        </div>
    </footer>
  )
}

export default Footer