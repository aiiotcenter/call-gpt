// create metadata for all the available functions to pass to completions API
const tools = [
 {
    type: "function",
    function: {
      name: "getFacultyPeople",
      description: "Get a list of all staff/faculty members from the Faculty of AI and Informatics at NEU",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
      say: "Let me fetch the list of faculty members for you.•",
    },
  },


];

module.exports = tools;