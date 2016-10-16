#!/usr/bin/env bash

# This is an installer script for DashingJS. It works well enough
# that it can detect if you have Node installed, run a binary script
# and then download and run DashingJS.

RED='\033[0;31m'
PURPLE='\033[0;35m'
YELLOW='\033[1;33m'
GREY='\033[0;90m'
WHITE='\033[1;37m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo " "
echo " "
echo -e "${WHITE} /MMMMMMM                      /MM       /MM                     ${PURPLE}    /GGGGG  /GGGGGG"
echo -e "${WHITE}| MM__  MM                    | MM      |__/                     ${PURPLE}   |__  GG /GG__  GG"
echo -e "${WHITE}| MM  \ MM  /MMMMMM   /MMMMMMM| MMMMMMM  /MM /MMMMMMM   /MMMMMM  ${PURPLE}      | GG| GG  \__/"
echo -e "${WHITE}| MM  | MM |____  MM /MM_____/| MM__  MM| MM| MM__  MM /MM__  MM ${PURPLE}      | GG|  GGGGGG"
echo -e "${WHITE}| MM  | MM  /MMMMMMM|  MMMMMM | MM  \ MM| MM| MM  \ MM| MM  \ MM ${PURPLE} /GG  | GG \____  GG"
echo -e "${WHITE}| MM  | MM /MM__  MM \____  MM| MM  | MM| MM| MM  | MM| MM  | MM ${PURPLE}| GG  | GG /GG  \ GG"
echo -e "${WHITE}| MMMMMMM/|  MMMMMMM /MMMMMMM/| MM  | MM| MM| MM  | MM|  MMMMMMM ${PURPLE}|  GGGGGG/|  GGGGGG/"
echo -e "${WHITE}|_______/  \_______/|_______/ |__/  |__/|__/|__/  |__/ \____  MM ${PURPLE} \______/  \______/"
echo -e "${WHITE}                                                       /MM  \ MM"
echo -e "${WHITE}                                                      |  MMMMMM/"
echo -e "${WHITE}                                                       \______/"
echo -e "${NC}"

# Define the tested version of Node.js.
NODE_TESTED="v6.9.1"
NPM_TESTED="3.10.9"

#Determine which Pi is running.
ARM=$(uname -m)

#define helper methods.
function version_gt() { test "$(echo "$@" | tr " " "\n" | sort -V | head -n 1)" != "$1"; }
function command_exists () { type "$1" &> /dev/null ;}

# Update
echo -e "${WHITE}Update system ...${GREY}"
sudo apt-get update -y  || exit
sudo apt-get autoremove -y  || exit
sudo apt-get install -y  || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

cd ~
# test if dashingJs folder exists
if [ -d "$HOME/dashingJs" ]; then
    echo -e "\e[93mIt seems like DashingJS is already installed."
    echo -e "To prevent overwriting, the installer will be aborted."
    echo -e "Please rename the \e[1m~/dashingJs\e[0m\e[93m folder and try again.\e[0m"
    echo ""
    echo -e "If you want to upgrade your installation run \e[1m\e[97mgit pull\e[0m from the ~/dashingJs directory."
    echo ""
    exit
fi

# Installing helper tools
echo -e "${WHITE}Installing helper tools ...${GREY}"
sudo apt-get install curl wget git build-essential unzip apt-transport-https -y || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

# Installing x11-xserver-utils
echo -e "${WHITE}Installing x11-xserver-utils ...${GREY}"
sudo apt-get install x11-xserver-utils -y || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

# Installing unclutter
echo -e "${WHITE}Installing unclutter ...${GREY}"
sudo apt-get install unclutter -y || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

# Installing chromium browser
echo -e "${WHITE}Installing chromium ...${GREY}"
sudo apt-get install chromium-browser -y || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

# Check if we need to stop pm2 dashing (in case of update)
echo -e "${WHITE}Check if we need to stop pm2 dashing ...\e[0m"
if command_exists pm2; then
    pm2 stop dashing
    echo -e "${PURPLE}pm2 is stopped.\e[0m";
else
    echo -e "${PURPLE}pm2 is not installed.\e[0m";
fi
echo " "

# Check if we need to install or upgrade Node.js.
echo -e "${WHITE}Check current Node installation ...\e[0m"
NODE_INSTALL=false
if command_exists node; then
    echo -e "\e[0mNode currently installed. Checking version number.";
    NODE_CURRENT=$(node -v)
    echo -e "${PURPLE}Minimum Node version: \e[1m$NODE_TESTED\e[0m"
    echo -e "${PURPLE}Installed Node version: \e[1m$NODE_CURRENT\e[0m"
    if version_gt $NODE_TESTED $NODE_CURRENT; then
        echo -e "${PURPLE}Node should be upgraded.\e[0m"
        NODE_INSTALL=true

        #Check if a node process is currenlty running.
        #If so abort installation.
        if pgrep "node" > /dev/null; then
            echo -e "${RED}A Node process is currently running. Can't upgrade."
            echo "Please quit all Node processes and restart the installer."
            exit;
        fi

    else
        echo -e "${PURPLE}No Node.js upgrade nessecery.\e[0m"
    fi

else
    echo -e "${PURPLE}Node.js is not installed.\e[0m";
    NODE_INSTALL=true
fi
echo " "


# Install or upgrade node if necessary.
if $NODE_INSTALL; then

    echo -e "${WHITE}Installing Node.js ...${GREY}"

    #Fetch the latest version of Node.js from the selected branch
    #The NODE_STABLE_BRANCH variable will need to be manually adjusted when a new branch is released. (e.g. 7.x)
    #Only tested (stable) versions are recommended as newer versions could break DashingJS.

    NODE_STABLE_BRANCH="6.x"
    curl -sL https://deb.nodesource.com/setup_$NODE_STABLE_BRANCH | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo ln -s /usr/bin/nodejs /usr/bin/node
    echo -e "${YELLOW} > done.${NC}"
    echo " "
fi

# Check if we need to install or upgrade Node.js.
echo -e "${WHITE}Check current NPM installation ...\e[0m"
NPM_INSTALL=false
if command_exists npm; then
    echo -e "\e[0mNPM currently installed. Checking version number.";
    NPM_CURRENT=$(npm -v)
    echo -e "${PURPLE}Minimum NPM version: \e[1m$NPM_TESTED\e[0m"
    echo -e "${PURPLE}Installed NPM version: \e[1m$NPM_CURRENT\e[0m"
    if version_gt $NPM_TESTED $NPM_CURRENT; then
        echo -e "${PURPLE}NPM should be upgraded.\e[0m"
        NPM_INSTALL=true

    else
        echo -e "${PURPLE}No NPM upgrade nessecery.\e[0m"
    fi

else
    echo -e "${PURPLE}NPM is not installed.\e[0m";
    NPM_INSTALL=true
fi
echo " "

# Install or upgrade node if necessary.
if $NPM_INSTALL; then
    echo -e "${WHITE}Install npm...${GREY}"
    sudo npm install npm@latest -g || exit
    echo -e "${YELLOW} > done.${NC}"
    echo " "
fi

echo -e "${WHITE}set NODE_ENV...${GREY}"
export NODE_ENV=prodution || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

#Install DashingJS
echo -e "${WHITE}Cloning DashingJS ...${GREY}"
if git clone https://github.com/MikhaelGerbet/dashingJs.git; then
    echo -e "${YELLOW} > done.${NC}"
    echo " "
else
    echo -e "${RED}Unable to clone DashingJS${NC}"
    exit;
fi

# Installing nginx
echo -e "${WHITE}Installing Nginx ...${GREY}"
sudo apt-get install nginx -y || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

# Configuration nginx
echo -e "${WHITE}Configuration Nginx ...${GREY}"
sudo rm -rf /etc/nginx/sites-available/default || exit
sudo rm -rf /etc/nginx/sites-enabled/default || exit
sudo cp /home/pi/dashingJs/installers/default.conf /etc/nginx/sites-available/default || exit
cd /etc/nginx/sites-enabled || exit
sudo ln -s ../sites-available/default || exit
sudo chmod 755 -R /home/pi/dashingJs/server
echo -e "${YELLOW} > done.${NC}"
echo " "

cd ~/dashingJs

# Installing php5
echo -e "${WHITE}Installing php5 ...${GREY}"
sudo apt-get -y install php5-fpm
echo -e "${YELLOW} > done.${NC}"
echo " "

# Installing curl php5
echo -e "${WHITE}Installing curl php5 ...${GREY}"
sudo apt-get -y install php5-curl
echo -e "${YELLOW} > done.${NC}"
echo " "

# Restart nginx
echo -e "${WHITE}Restart nginx ...${GREY}"
sudo service nginx stop
sudo service nginx start
echo -e "${YELLOW} > done.${NC}"
echo " "

# NPM clear cache
echo -e "${WHITE}NPM clear cache...${GREY}"
sudo npm cache clean || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

# Installing bower
echo -e "${WHITE}Installing bower ...${GREY}"
sudo npm install -g bower || exit
echo -e "${YELLOW} > done.${NC}"
echo " "

# Installing http-server
echo -e "${WHITE}Installing http-server ...${GREY}"
sudo npm install -g http-server
echo -e "${YELLOW} > done.${NC}"
echo " "

# Installing default config
echo -e "${WHITE}Making default config ...${GREY}"
cd ~/dashingJs
cp dist/config.js.sample dist/config.js
cp dist/jobs.js.sample dist/jobs.js
cp dist/jobs.js.sample app/jobs.js

EXEMPLE_SLACK_TOKEN='xoxp-100834164723-100989377653-100990575621-'
EXEMPLE_SLACK_TOKEN+='23a539efff210c76293a85235d673793'
EXEMPLE_SLACK_CHANNEL_ID='C2YUSDD28'
EXEMPLE_TEAM_MOOD='demo-fr'

sed -i "s/_YOUR_SLACK_TOKEN_/$EXEMPLE_SLACK_TOKEN/g" dist/config.js
sed -i "s/_YOUR_SLACK_CHANNEL_ID_/$EXEMPLE_SLACK_CHANNEL_ID/g" dist/config.js
sed -i "s/_YOUR_TEAM_MOOD_TOKEN_/$EXEMPLE_TEAM_MOOD/g" dist/config.js

cp dist/config.js app/config.js
echo -e "${YELLOW} > done.${NC}"
echo " "

# Installing npm dependencies
echo -e "${WHITE}Installing npm dependencies ...${GREY}"
cd ~/dashingJs && npm install --production
echo -e "${YELLOW} > done.${NC}"
echo " "


echo " "
echo -e "\e[92mWe're ready! Run \e[1m\e[97mDISPLAY=:0 npm start --production\e[0m\e[92m from the ~/dashingJs directory to start your DashingJS.\e[0m"
echo " "
echo " "