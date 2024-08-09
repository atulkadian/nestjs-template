#!/bin/bash
echo "Enter module name: "
read moduleName

nest g resource $moduleName --no-spec

mv src/$moduleName src/modules/$moduleName
