// import styles from "../styles/Search.module.css";
import { useParams } from 'react-router-dom'
import useAuth from '../api/util/useAuth'
import UseFeedQuery from '../api/UseFeedQuery'
import UseSearchPostResultsMutation from '../api/UseSearchResultPostMutation'
import { Post } from '../components/post/Post'
import { useEffect, useState } from 'react'
import Spinner from '../components/common/Spinner'
import Fuse from 'fuse.js'


const SearchPost = () => {
  const [account, isLoading] = useAuth()
  const { searchStr } = useParams();
  const searchPostResultMutation = UseSearchPostResultsMutation()
	const feedQuery = UseFeedQuery()
  const feeds = feedQuery.data?.data.posts
  let result: any = []
  let finalResult: any = []

  useEffect(() => {
    if (feeds !== undefined && feeds.length > 0 && searchStr !== undefined) {
      const fuse = new Fuse(feeds, {
        shouldSort: true,
        threshold: 0.5,
        keys: ["location_name"]
      })
      result = fuse.search(searchStr)
      if (result.length) {
        result.forEach((item: any) => {
          finalResult.push(item.item)
        })
      }
    }
    console.log(result)
  }, [searchStr])
  

  return (
    <>
    <h1 className='text-justify text-2xl px-48'>Search results for '{searchStr}'</h1>
      <div> 
        {//no results
          result === undefined || result.length == 0 && finalResult.length == 0 && (
            <h1 className='mx-auto block w-2/3 text-center mt-[200px] mb-[200px] text-xl text'>
              No results
            </h1>
          )
        }
        
        {//posts results
        finalResult !== undefined && finalResult.length > 0 &&
          finalResult.map((post:Post, index:number) => {
            return (
              <Post key={index} post={post} />
            )
          })
        }
      </div>     
    </>
  )
}

export default SearchPost