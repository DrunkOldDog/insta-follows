# insta-follows

<!-- ABOUT THE PROJECT -->
## About The Project

Since instagram kind of "banned" the following applications and all of the ig Chrome extensions seem to be `pay-to-use`, I've decided to create this simple node script to allow people to check who don't follow them back on instagram.

Probably in the future we can check some ways to integrate an API connection directly to instagram or an easy way to upload the files needed from a frontend. So contributions and suggestions are more than welcome! 😊

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Download your Instagram information

In order to run the script, you need to have your instagram information downloaded in your computer. This allows you to use your information in a _legal way_.

To download your information, follow the steps from their site [here](https://help.instagram.com/181231772500920) (this step can take up to several days).

After you received and downloaded your information. You would be able to find two files: `following.html` and `followers.html`. You will need to copy both files into the `/instagram/` directory in the root of this project.

![image](https://user-images.githubusercontent.com/21226219/201769077-9e7fe6c7-ae1b-4b9b-bbb4-efa2e21282cf.png)

### Prerequisites

You need [Node](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac) installed in your computer to run this project locally.

Aditionally this project uses `yarn` by default, but you are welcome to use `npm`.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/DrunkOldDog/insta-follows.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   or 
   ```sh
   yarn install
   ```
3. Run the project
   ```sh
   node index.js
   ```

### Results

With this, when running the project you should get something like this:

<img width="886" alt="image" src="https://user-images.githubusercontent.com/21226219/201770406-8c5e1d7b-947c-4a79-94e2-30a238b536f0.png">

<!-- CONTRIBUTING -->
## Contributing

Any contributions for making this project better are welcome!
