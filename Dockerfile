# Use the Node.js image as base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists) and install dependencies
COPY package*.json ./
RUN npm install

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Copy the rest of your application files
COPY . .

# Expose the port that the app will run on (optional)
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
