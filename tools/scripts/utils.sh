# Function to check if script was called with sudo
check_sudo_required() {
    if [ "$(id -u)" -ne 0 ]; then
        echo "This script was not executed with sudo."
        return 1
    else
        echo "This script was executed with sudo."
        return 0
    fi
}

# Append 'sudo' to commands if required
if check_sudo_required; then
    sudo_cmd="sudo"
else
    sudo_cmd=""
fi

echo "Prepending \"${sudo_cmd}\" to commands"

# Pre-check: Verify if Docker daemon is running
$sudo_cmd docker ps >/dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Docker daemon is not running or inaccessible."
    exit 1
fi