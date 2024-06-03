import React, { useState } from 'react'
import Button from '../components/button'
import useAxiosPrivate from '../hooks/axios-private'
import toast from 'react-hot-toast'
import Input from '../components/input'
import { useNavigate } from 'react-router-dom'
import TextArea from '../components/text-area'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AddBookPage = () => {

  const queryClient = useQueryClient()

  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()

  const [book, setBook] = useState({
    title: "",
    price: 0,
    description: "",
    author: "",
    publisher: "",
    publicationDate: ""
  })

  const [image, setImage] = useState(null)

  const addBookMutation = useMutation({
    mutationFn: async (formData) => await axiosPrivate.post('/books', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),
    // 200 success 201 create
    onSuccess: (response) => {

      if (response.data?.message) {
        toast.success(response.data.message)
      } else {

        toast.success("uploaded")
      }
      queryClient.invalidateQueries({
        queryKey: ["books"]
      })
      navigate('/books')
    },
    // 400 5000 error
    onError: (error) => {
      if (error?.response.data?.message) {
        toast.error(response.data.message)
      } else {

        toast.error("Error occured")

      }
    }
  })



  const handleFileUpload = async () => {

    const formData = new FormData()

    formData.append("images", image)
    formData.append("title", book.title)
    formData.append("price", book.price)
    formData.append("description", book.description)
    formData.append("author", book.author)
    formData.append("publisher", book.publisher)
    formData.append("publicationDate", book.publicationDate)


    addBookMutation.mutate(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setBook(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleImageChange = (e) => {
    console.log("", e.target.files)
    setImage(e.target.files[0])
  }
  return (
    <div className='flex flex-col items-center gap-3 px-5 xl:px-[400px]'>
      <h2 className='text-3xl font-semibold my-3'>Add Book</h2>
      {
        image &&
        <img src={URL.createObjectURL(image)} alt="book cover"
          className="h-[300px] w-[300px] object-cover "
        />
      }


      <Input name='title' placeholder='Enter book title' label='Title' value={book.title} onChange={handleChange} />
      <TextArea name='description' placeholder='Enter book description' label='Description' value={book.description} onChange={handleChange} />
      <Input name='price' placeholder='Enter book price' label="Price" value={book.price} onChange={handleChange} />
      <Input name='author' placeholder='Enter book author' label="Author" value={book.author} onChange={handleChange} />
      <Input name='publisher' placeholder='Enter book publisher' label="Publisher" value={book.publisher} onChange={handleChange} />
      <Input name='publicationDate' placeholder='Enter book publication date' label="Publication Date" value={book.publicationDate} onChange={handleChange} type='date' />

      <input type="file" onChange={handleImageChange} />

      <Button onClick={handleFileUpload}>
        Submit
      </Button>
    </div>
  )
}

export default AddBookPage