// create metadata for all the available functions to pass to completions API
const tools = [
  {
    type: 'function',
    function: {
      name: 'checkCourseInfo',
      say: 'Let me check the course information for you.',
      description: 'Retrieve details about a specific course (title, language, teacher, etc.).',
      parameters: {
        type: 'object',
        properties: {
          courseCode: {
            type: 'string',
            description: 'The course code (e.g., AI101, ML202).',
          },
        },
        required: ['courseCode'],
      },
      returns: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Course title' },
          language: { type: 'string', description: 'Language of instruction' },
          teacher: { type: 'string', description: 'Instructor name' },
          credits: { type: 'integer', description: 'Number of credits' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'checkSchedule',
      say: 'Let me check the schedule for you.',
      description: 'Retrieve the schedule for a given course or semester.',
      parameters: {
        type: 'object',
        properties: {
          courseCode: {
            type: 'string',
            description: 'Optional: course code to check schedule for.',
          },
          semester: {
            type: 'string',
            description: 'Optional: semester (e.g., Fall 2025, Spring 2026).',
          },
        },
      },
      returns: {
        type: 'object',
        properties: {
          schedule: {
            type: 'array',
            description: 'List of class sessions',
            items: {
              type: 'object',
              properties: {
                day: { type: 'string', description: 'Day of the week' },
                time: { type: 'string', description: 'Class time' },
                room: { type: 'string', description: 'Room or lab location' },
              },
            },
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'checkFacultyInfo',
      say: 'Let me get the faculty information for you.',
      description: 'Retrieve details about faculty or staff members.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the faculty or staff member.',
          },
        },
        required: ['name'],
      },
      returns: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Academic title or position' },
          office: { type: 'string', description: 'Office location' },
          email: { type: 'string', description: 'Email address' },
          phone: { type: 'string', description: 'Contact number' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'reportIssue',
      say: 'I will log this issue for our support team.',
      description: 'Log a technical or administrative issue reported by the student.',
      parameters: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'Student or staff ID' },
          issue: { type: 'string', description: 'Description of the issue' },
        },
        required: ['userId', 'issue'],
      },
      returns: {
        type: 'object',
        properties: {
          ticketId: { type: 'string', description: 'Support ticket number' },
          status: { type: 'string', description: 'Status of the issue report' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'transferCall',
      say: 'One moment while I transfer your call to a faculty administrator.',
      description: 'Transfers the caller to a live faculty help desk agent.',
      parameters: {
        type: 'object',
        properties: {
          callSid: {
            type: 'string',
            description: 'The unique identifier for the active phone call.',
          },
        },
        required: ['callSid'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Whether or not the call was successfully transferred.',
          },
        },
      },
    },
  },
];

module.exports = tools;
