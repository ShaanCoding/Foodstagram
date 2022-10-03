import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Form from '../form/Form'
import UseSearchPostMutation from '../../api/UseSearchPostMutation'
import UseSearchUserMutation from '../../api/UseSearchUserMutation'
import UseSearchResultPostMutation from '../../api/UseSearchResultPostMutation'
import useAuth from '../../api/util/useAuth'
import { Link } from 'react-router-dom'

const SearchBar = () => {
	const [account, isLoading] = useAuth()
	const [searchString, setSearchString] = useState('')
	const [placeholder, setPlaceholder] = useState('Enter Username')
	const [searchResult, setSearchResult] = useState([])
	const searchUserMutation = UseSearchUserMutation()
	const searchPostMutation = UseSearchPostMutation()

	const HandleSelectTypeChange = (e: any) => {
		if (e.target.value === 'User') {
			setPlaceholder('Enter Username')
			setSearchString('')
		} else {
			setPlaceholder('Enter Location')
			setSearchString('')
		}
	}

	useEffect(() => {
		// if (searchString === "") {
		//   setSearchResult([])
		// }
		if (placeholder === 'Enter Username') {
			searchUserMutation.mutate({
				searchStr: searchString,
			})
			setSearchResult(searchUserMutation.data?.data.data)
			console.log(searchResult)
		}
		if (placeholder === 'Enter Location') {
			searchPostMutation.mutate({
				searchStr: searchString,
			})
			setSearchResult(searchPostMutation.data?.data.data)
			console.log(searchResult)
		}
	}, [searchString])

	return (
		<>
			<form className="w-full lg:w-1/2 flex justify-end items-center relative">
				<select
					className="w-28 h-10 rounded items-center text-center"
					onChange={(e) => HandleSelectTypeChange(e)}
				>
					<option>User</option>
					<option>Location</option>
				</select>
				<input
					value={searchString}
					onChange={(e) => setSearchString(e.target.value)}
					className="focus:ring-0 focus:outline-none bg-gray-100 text-black text-base p-2 rounded-md w-full"
					type="text"
					placeholder={placeholder}
				/>
				<FontAwesomeIcon
					onClick={(e) => setSearchString('')}
					className="absolute w-5 h-5 mr-4 pointer-events-none"
					icon={solid('search')}
				/>
				{searchResult !== undefined &&
					searchResult.map((element: { item: Account }) => {
						return (
							<div className='inline-flex flex-col justify-center relative'>
                <ul className="bg-white border border-gray-100 w-full mt-2 z-50 hover:bg-grey-100 align-middle">
                  <li className='pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-grey-100 hover:text-gray-900'>
                    <Link to={`/profile/${element.item.account_id}`}>
                      <a href={`${element.item.profile_picture_url}`} />
                      <img
                        alt="avatar"
                        className="w-8 h-8 rounded-full border-2 border-gray-700"
                        src={`${element.item.profile_picture_url}`}
						          />
                      <p>{element.item.username}</p>
                    </Link>
                  </li>  
                </ul>
              </div>
						)
					})
        }


				{/* {placeholder === 'User' && (
        <div>
          {searchResult.slice(0, 10).map((value:any, key:any) => {
            return (
              <p>{value.username}</p>
              <Link to={`/profile/${value.username}`}>
                <a href={value.profile_picture_url}/>
                <p>{value.username} </p>
              </Link>
            );
          })}
        </div>
      )} */}
			</form>
		</>
	)
}

export default SearchBar
