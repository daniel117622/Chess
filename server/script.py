import sys
import json

# Read the JSON input from the command line arguments
json_input = json.loads(sys.argv[1])

# Perform some processing on the JSON data (e.g., modify it)
# Here, we simply add a new key-value pair to the JSON object
json_input['processed'] = True

# Convert the modified JSON back to a string
json_output = json.dumps(json_input)

# Print the modified JSON to be captured by the Node.js script
print(json_output)