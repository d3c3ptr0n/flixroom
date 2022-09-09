import errorImage from '../assets/error-image.webp'
import Navbar from '../components/Navbar'

function ErrorPage() {
  	return (
		<>
			<Navbar />
			<h1 className='text-center text-4xl mb-5 mt-20'>404: Page Not Found</h1>
			<div className="flex justify-center items-center p-5">
				<img src={errorImage} alt="" width={600}/>
			</div>
		</>
  	)
}

export default ErrorPage