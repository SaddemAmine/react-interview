import { useState, useEffect, Key } from 'react'

import Head from 'next/head'
import Card from '@/components/Card'
import styles from '@/styles/Home.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, selectMovies } from '@/slices/movieSlice'
import { AppDispatch } from '@/store'
import Navbar from '@/components/Navbar'

import ReactPaginate from 'react-paginate'
import Select from 'react-select'

import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Home() {
	const { movies, loading, filter } = useSelector(selectMovies)
	const dispatch = useDispatch<AppDispatch>()

	const [movieOffset, setmovieOffset] = useState(0)
	const [moviesPerPage, setmoviesPerPage] = useState(movies.length || 10)

	const endOffset = movieOffset + moviesPerPage
	const currentmovies = movies.slice(movieOffset, endOffset)
	const pageCount = Math.ceil(movies.length / moviesPerPage)

	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * moviesPerPage) % movies.length
		setmovieOffset(newOffset)
	}

	useEffect(() => {
		dispatch(fetchMovies())
	}, [dispatch])

	if (loading)
		return (
			<div role="status">
				<svg
					aria-hidden="true"
					className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		)

	return (
		<>
			<Head>
				<title>Partikeep</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>

			<Navbar />
			<main
				className={
					styles.main + ' pt-36 px-24 max-sm:pt-64 max-sm:px-4'
				}
			>
				<div className="flex mb-8 w-full justify-start gap-x-4 items-center">
					<ReactPaginate
						breakLabel="..."
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel={
							<button className="bg-orange-500 text-white p-2.5 rounded-full">
								<ArrowLeftIcon className="h-6 text-white-500" />
							</button>
						}
						nextLabel={
							<button className="bg-orange-500 text-white p-2.5 rounded-full">
								<ArrowRightIcon className="h-6 text-white-500" />
							</button>
						}
						renderOnZeroPageCount={() => null}
						containerClassName="flex justify-center gap-x-2"
						pageClassName="hidden"
					/>
					<Select
						options={[4, 8, 12].map(value => ({
							value,
							label: value + ' / page',
						}))}
						menuPosition="fixed"
						onChange={option =>
							setmoviesPerPage(option!.value ?? moviesPerPage)
						}
						placeholder="Movies per page"
					/>
				</div>

				<div className="flex flex-wrap justify-evenly movies-stretch gap-x-4 gap-y-16 w-full">
					{currentmovies
						.filter(
							movie =>
								filter.includes(movie.category) ||
								filter.length === 0
						)
						.map((movie, index) => (
							<Card data={movie} key={index} />
						))}
				</div>
			</main>
		</>
	)
}
