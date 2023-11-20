'use client'
import mockFetch from '@/api/mock';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const StyledForm = () => {
    const [selectedOption, setSelectedOption] = useState();
    const { register, handleSubmit, trigger, formState: { errors, isValid }, clearErrors, control, watch } = useForm({
        mode: 'onChange', defaultValues: {
            dateOfBirth: new Date('2003-01-01'),
        }
    });

    const onSubmit = async (data) => {
        try {
           await mockFetch('/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error('Error:', error)
        }
    };

    useEffect(() => {
        trigger('dateOfBirth')
    }, [selectedOption])
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        clearErrors()
    };

    const dateValidation = (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 21);

        if (selectedOption === "Teacher" && selectedDate > minDate) {
            return 'age may not be less than 21';
        }

        if (selectedOption === "Student" && selectedDate < minDate) {
            return 'age may not be more than 22';
        }
        return true;
    }
    const titles = ['Mr', 'Mrs', 'Miss', 'Dr', 'Prof']
    return (
        <div className="flex  justify-center mt-12">
            <form className="w-full max-w-md p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label htmlFor="userType" className="block text-gray-700 font-bold mb-2">Select User Type:</label>
                    <select
                        id="userType"
                        value={selectedOption}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option >Select...</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                    </select>
                </div>
                <div className="mb-2 mx-1">
                    <label htmlFor="nationalID" className="block text-gray-700 font-bold mb-2">National ID</label>
                    <input
                        type="number"
                        id="nationalID"
                        {...register('nationalID', { required: 'National ID is required' })}
                        className="w-full px-1 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.nationalID && <span className="text-red-500">{errors.nationalID.message}</span>}
                </div>
                <div className="mb-2 mx-1">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-1 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div className="mb-2 mx-1">
                    <label htmlFor="surname" className="block text-gray-700 font-bold mb-2">Surname</label>
                    <input
                        type="text"
                        id="surname"
                        {...register('surname', { required: 'Surname is required' })}
                        className="w-full px-1 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.surname && <span className="text-red-500">{errors.surname.message}</span>}
                </div>
               {selectedOption === "Teacher" && <div>
                    <div><label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                    <select
                        id="title"
                     
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      {...register('title', { required: 'title is required' })}
                    >
                        <option  value=''>Select...</option>
                        {titles.map(title=><option value={title} key={title}>{title}</option>)}
                        
                    </select></div>
                    {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                </div>}
                <div className="my-2 mx-1  py-2 ">
                    <div className='flex flex-row'>
                        <label htmlFor="surname" className="block text-gray-700 font-bold mb-2 mr-4">Date of birth</label>
                        <Controller
                            control={control}
                            name="dateOfBirth"
                            rules={{
                                required: 'Date of birth is required',
                                validate: value => dateValidation(value),
                            }}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <DatePicker
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    placeholderText='Select date of birth'
                                />
                            )}
                        />

                    </div>
                    {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth.message}</span>}
                </div>
                {(selectedOption === "Student" || selectedOption === "Teacher") && <div className="mb-2 mx-1">
                    <label  className="block text-gray-700 font-bold mb-2">{selectedOption} number</label>
                    <input
                        type="text"
                        id={selectedOption}
                        {...register(selectedOption + 'number', { required: `${selectedOption} number is required` })}
                        className="w-full px-1 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.Teacher && selectedOption === "Teacher" && <span className="text-red-500">{errors.Teacher.message}</span>}
                    {errors.Student && selectedOption === "Student" && <span className="text-red-500">{errors.Student.message}</span>}
                </div>}
                {selectedOption === "Teacher" && <div className="mb-2 mx-1">
                    <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">Salary</label>
                    <input
                        type="text"
                        id="salary"
                        {...register('salary')}
                        className="w-full px-1 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                    />

                </div>}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:bg-blue-200"
                        disabled={Object.keys(errors).length > 0 || !selectedOption || !isValid}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StyledForm;


