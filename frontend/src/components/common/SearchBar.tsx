import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Form from '../form/Form'
import UseSearchPostMutation from "../../api/UseSearchPostMutation";
import UseSearchUserMutation from "../../api/UseSearchUserMutation";
import UseSearchResultPostMutation from "../../api/UseSearchResultPostMutation";

const SearchBar = () => {
  const [searchString, setSearchString] = useState('');
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
    console.log(searchString)
    if (searchString === "") {
      setSearchResult([])
    }
    if (placeholder === 'Enter Username') {
      searchUserMutation.mutate({
        searchStr: searchString
      })
      console.log(searchUserMutation.data?.data.data)
    }
    if (placeholder === 'Enter Location') {
      searchPostMutation.mutate({
        searchStr: searchString
      })
      console.log(searchPostMutation.data?.data.data)
    }
  }, [searchString])


  return (
    <><form className="w-full lg:w-1/2 flex justify-end items-center relative">
      <select className="w-28 h-10 rounded items-center text-center" onChange={e => HandleSelectTypeChange(e)}>
        <option>User</option>
        <option>Location</option>
      </select>
      <input
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
        className="focus:ring-0 focus:outline-none bg-gray-100 text-black text-base p-2 rounded-md w-full"
        type="text"
        placeholder={placeholder}
      />
      <FontAwesomeIcon
        onClick={e => setSearchString('')}
        className="absolute w-5 h-5 mr-4 pointer-events-none"
        icon={solid("search")}
      />
    </form></>
    
  )
}

export default SearchBar;