#!/bin/sh

ROOT_DIR=$pwd
NPM_USER=$1
NPM_PASS=$2
ARTIFACT_REGISTRY=$3
IMAGE=$4
PROJECT_BRANCH_NAME=$5

UNIT_TEST_LOG="${ROOT_DIR}/${IMAGE}_unittest.log"
UNIT_TEST_COVERAGE_LOG="${ROOT_DIR}/${IMAGE}_unittest_coverage.log"

# download curl package
apt-get install curl -y

# run npm test
npm test >"${UNIT_TEST_LOG}"

# exit if test cases failed
if [ "$(cat "${UNIT_TEST_LOG}" | grep -i "failing" >/dev/null && echo $?)" = "0" ]; then

    cat "${UNIT_TEST_LOG}" | grep -i failing
    echo "Unit tests failed"
    exit 1

else

    cat "${UNIT_TEST_LOG}" | tail -n 3
    echo "Unit tests passed successfully"
  
fi
