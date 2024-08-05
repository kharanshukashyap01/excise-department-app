# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js dependencies
RUN npm install

# Expose the port on which the application will run
EXPOSE 5000
EXPOSE 3306

# Command to run the app
#CMD ["sh", "-c", "npm start & python Login.py"]

# Start MySQL and the application
CMD service mysql start && \
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS yourdatabase;" && \
    npm start & python Login.py