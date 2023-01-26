import Image from 'next/image'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const Navbar = () => {
	const [selectedOption, setSelectedOption] = useState()

	const options = [
		{ value: 'Comedy', label: 'Comedy' },
		{ value: 'Drama', label: 'Drama' },
		{ value: 'Thriller', label: 'Thriller' },
		{ value: 'Animation', label: 'Animation' },
	]

	return (
		<nav className="min-h-min px-12 md:px-24 fixed w-full">
			<section className="bg-orange-500 w-full h-full px-12 py-6 flex justify-between items-center rounded-b-lg max-sm:flex-wrap max-sm:justify-center max-sm:gap-y-5">
				<Image
					src="/partikeep.svg"
					alt="logo"
					className="hidden md:block mr-4"
					width={180}
					height={200}
				/>
				<Image
					src="/mini_partikeep.svg"
					alt="logo"
					className="block md:hidden mr-4"
					width={40}
					height={40}
				/>

				<Select
					options={options}
					isMulti
					onChange={options => console.log(options)}
					placeholder="Genres..."
				/>
			</section>
		</nav>
	)
}

export default Navbar
