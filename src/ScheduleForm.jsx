import React, { useState } from "react";

const ScheduleForm = ({ toggle }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    candidateGender: "",
    candidateEmail: "",
    candidateComment: "",
    position: "",
    jobRole: "",
    jobSkills: "",
    jobDescription: "",
    start: "",
    end: "",
    link: "",
    summary: "",
    desc: "",
    handlerEmail: "",
    handlerUsername: "",
    handlerFirstName: "",
    handlerLastName: "",
    handlerRole: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    const { firstName, lastName, candidateEmail, start, end, handlerEmail } =
      formData;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!firstName) formErrors.firstName = "First Name is required";
    if (!lastName) formErrors.lastName = "Last Name is required";
    if (!candidateEmail || !emailRegex.test(candidateEmail))
      formErrors.candidateEmail = "Valid email is required";
    if (!start) formErrors.start = "Start Date & Time is required";
    if (!end) formErrors.end = "End Date & Time is required";
    if (!handlerEmail || !emailRegex.test(handlerEmail))
      formErrors.handlerEmail = "Valid Handler Email is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md h-[80vh] shadow-xl transform transition-transform duration-300 scale-100">
      <h2 className="text-xl font-semibold mb-4">Create a New Schedule</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="h-[55vh] overflow-y-auto flex-grow px-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Candidate Gender
            </label>
            <input
              type="text"
              name="candidateGender"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.candidateGender}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Candidate Email
            </label>
            <input
              type="text"
              name="candidateEmail"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.candidateEmail}
              onChange={handleChange}
            />
            {errors.candidateEmail && (
              <p className="text-red-500 text-xs">{errors.candidateEmail}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Candidate Comment
            </label>
            <input
              type="text"
              name="candidateComment"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.candidateComment}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              name="position"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Role
            </label>
            <input
              type="text"
              name="jobRole"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.jobRole}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Skill
            </label>
            <input
              type="text"
              name="jobSkills"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.jobSkills}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <input
              type="text"
              name="jobDescription"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.jobDescription}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start (Date & Time)
            </label>
            <input
              type="datetime-local"
              name="start"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.start}
              onChange={handleChange}
            />
            {errors.start && (
              <p className="text-red-500 text-xs">{errors.start}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End (Date & Time)
            </label>
            <input
              type="datetime-local"
              name="end"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.end}
              onChange={handleChange}
            />
            {errors.end && <p className="text-red-500 text-xs">{errors.end}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <input
              type="text"
              name="link"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Summary
            </label>
            <input
              type="text"
              name="summary"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.summary}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="desc"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Handler Email
            </label>
            <input
              type="text"
              name="handlerEmail"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.handlerEmail}
              onChange={handleChange}
            />
            {errors.handlerEmail && (
              <p className="text-red-500 text-xs">{errors.handlerEmail}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Handler Username
            </label>
            <input
              type="text"
              name="handlerUsername"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.handlerUsername}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Handler FirstName
            </label>
            <input
              type="text"
              name="handlerFirstName"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.handlerFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Handler LastName
            </label>
            <input
              type="text"
              name="handlerLastName"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.handlerLastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Handler Role
            </label>
            <input
              type="text"
              name="handlerRole"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={formData.handlerRole}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 sticky bottom-0 bg-white py-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg"
            onClick={() => toggle(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
