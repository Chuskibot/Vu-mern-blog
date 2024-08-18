import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Titel"
            required
            id="titel"
            className="flex-1"
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="cse">Computer Science & Engineering (CSE)</option>
            <option value="eee">
              Electrical & Electronic Engineering (EEE)
            </option>
            <option value="bba">Business Administration (BBA)</option>
            <option value="eng">English Language & Literature</option>
            <option value="law">Law</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="economics">Economics</option>
            <option value="sociology">Sociology</option>
            <option value="mathematics">Mathematics</option>
            <option value="public-health">Public Health</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-md outline-none hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 ease-in-out"
            size="sm"
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-2 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:opacity-90"
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
