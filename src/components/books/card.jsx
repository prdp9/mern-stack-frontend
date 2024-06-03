import React from 'react'
import Button from '../button'
import { Link, } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/axios-private'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const BookCard = ({ book }) => {

    const queryClient = useQueryClient()

    const axiosPrivate = useAxiosPrivate()

    const mutateBook = useMutation({
        mutationFn: async () => await axiosPrivate.delete(`/books/${book._id}`),
        onSuccess: (response) => {
            if (response.data.message) {
                toast.success(response.data.message)
            } else {
                toast.success("Book deleted!")
            }
            queryClient.invalidateQueries({
                queryKey: ["books"]
            })
        },
        onError: (error) => {
            if (error.response.data.message) {
                toast.success(response.data.message)
            } else {
                toast.success("Failed to delete book!")

            }
        }
    })

    const handleDelete = async (e) => {
        e.stopPropagation()
        mutateBook.mutate()
    }

    return (
        <div className='shadow-xl  rounded-md  w-[250px] overflow-hidden pb-5 h-[370px]'>
            <Link to={`/books/${book._id}`}>

                <img src={`http://localhost:8080/${book.image}`} alt="book cover"
                    className="h-[200px] w-[100%] object-cover "
                />
                <div className="p-3">
                    <h2 className="text-2xl font-bold">
                        {book.title}
                    </h2>
                    <h2 className=' '>
                        {book.description}
                    </h2>
                </div>
            </Link>

            <div className='flex justify-center gap-3'>
                <Link to={`/books/update/${book._id}`}

                >
                    <Button>
                        Update
                    </Button>
                </Link>

                <Button onClick={handleDelete}>
                  {
                    mutateBook.isPending ? 'Deleting...' : 'Delete'
                  }
                </Button>

            </div>
        </div>
    )
}

export default BookCard

// overflow-ellipsis whitespace-nowrap overflow-hidden