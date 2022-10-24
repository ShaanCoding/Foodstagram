import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import UseSearchPostMutation from '../../api/UseSearchPostMutation'
import UseSearchUserMutation from '../../api/UseSearchUserMutation'
import UseSearchFollowerMutation from '../../api/UseSearchFollowerMutation'
import useAuth from '../../api/util/useAuth'
import { Link, useNavigate } from 'react-router-dom'

const SearchBar = () => {
	const [account, isLoading] = useAuth()
	const [searchString, setSearchString] = useState("")
	const [placeholder, setPlaceholder] = useState('Enter Username')
	const searchUserMutation = UseSearchUserMutation()
	const searchPostMutation = UseSearchPostMutation()
  const searchFollowerMutation = UseSearchFollowerMutation()
	const [selectResult, setSelectResult] = useState(false)
  const [searchDropdown, setSearchDropdown] = useState(false)
	const navigate = useNavigate()

	const HandleSelectTypeChange = (e: any) => {
		if (e.target.value === 'User') {
			setPlaceholder('Enter Username')
			setSearchString('')
		} else if (e.target.value === 'Location') {
			setPlaceholder('Enter Location')
			setSearchString('')
		} else {
      setPlaceholder('Enter Follower')
      setSearchString('')
    }
	}

  const HandleSubmit = (e: any) => {
    e.preventDefault()
    if (searchString.length > 0) {
      if (placeholder === 'Enter Username')
        navigate('/search/user/' + searchString)
      if (placeholder === 'Enter Location')
        navigate('/search/post/' + searchString)
      if (placeholder === 'Enter Follower')
        navigate('/search/follower/' + searchString)
    }
    setSearchString("")
  }

  useEffect(() => {
    if (placeholder === 'Enter Username') {
			searchUserMutation.mutate({
				searchStr: searchString
			})
		}
		if (placeholder === 'Enter Location') {
			searchPostMutation.mutate({
				searchStr: searchString
			})
		}
    if (placeholder === 'Enter Follower') {
      searchFollowerMutation.mutate({
        searchStr: searchString,
        account_id: account.account_id
      })
    }
  }, [searchString])

  console.log(account)

	useEffect(() => {
		setSearchString('')
		setSelectResult(false)
	}, [selectResult])

  let searchResults, locationResults

  //remove duplilcates
  const filterLocationResults = () => {

  }

  if (placeholder === 'Enter Username') {
    searchResults = searchUserMutation.data?.data.data
  }
  else if (placeholder === 'Enter Location') {
    searchResults = searchPostMutation.data?.data.data
    locationResults = [...new Set(searchResults?.map((item:any) => item.item.location_name))]
  }
  else {
    searchResults = searchFollowerMutation.data?.data.data
  }


  return (
    <>
      <form className="w-full lg:w-1/2 flex justify-end items-center relative" onSubmit={(e) => HandleSubmit(e)}>
        <select
          className="w-28 h-10 rounded items-center text-center"
          onChange={(e) => HandleSelectTypeChange(e)}
        >
          <option>User</option>
          <option>Location</option>
          <option>Follower</option>
        </select>
        <input
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onBlur={e => setTimeout((e) => setSearchDropdown(false), 200)}
          onFocus={e => setSearchDropdown(true)}
          className="focus:ring-0 focus:outline-none bg-gray-100 text-black text-base p-2 rounded-md w-full"
          type="text"
          placeholder={placeholder}
        />
        <FontAwesomeIcon
          className="absolute w-5 h-5 mr-4 pointer-events-none"
          icon={solid('search')}
        />
        <div className='absolute top-10 left-1 w-full'>
          <div className='flex-col justify-center relative z-50 hover:bg-grey-100 h-auto w-full'>
            {//search usernames
              placeholder === 'Enter Username' && searchResults !== undefined && searchResults.length > 0 && searchString.length > 0 && searchDropdown &&
              searchResults.map((element: { item: Account }) => {
                return (
                  <ul className="bg-white border border-gray-100 w-full align-middle">
                    <li className='bg-white pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-grey-100 hover:text-gray-900'>
                      <div key={element.item.account_id}>
                        <Link
                          onClick={(e) => setSelectResult(true)}
                          className='flex-row flex py-2'
                          to={`/profile/${element.item.username}`}
                        >
                          <img
                            alt="avatar"
                            className="w-8 h-8 rounded-full border-2 border-gray-700"
                            src={`${element.item.profile_picture_url}`}
                          />
                          <p className='px-3'>{element.item.name}</p>
                          <p className='text-stone-500 text-right'>@{element.item.username}</p>
                        </Link>
                      </div>
                    </li>
                  </ul>
                )
              })
            }

            {//search posts
              placeholder === 'Enter Location' && locationResults !== undefined && locationResults.length > 0 && searchString.length > 0 && searchDropdown &&
              locationResults.map((location:any) => {
                return (
                  <ul className="bg-white border border-gray-100 w-full hover:bg-grey-100 align-middle">
                    <li className='bg-white pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-grey-100 hover:text-gray-900'>
                      <div key={location}>
                        <Link
                          onClick={(e) => { setSelectResult(true) }}
                          className='flex-row flex py-2'
                          to={`/search/post/${location}`}
                        >
                          <p className='px-3'>{location}</p>
                        </Link>
                      </div> 
                    </li>
                  </ul>
                )
              })
            }
          </div>
        </div>
      </form>
    </>
  )
}

export default SearchBar
