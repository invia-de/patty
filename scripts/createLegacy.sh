#!/bin/bash

echo ""

echo "Component Creation Script"
echo "========================="

echo ""

echo "Which type of Component do you wnat to create?"
read -p " Type [c] for class or [f] for functional component: " type
echo ""

if [ "$type" == "c" ]
  then
    echo "Ok, a Class Component."
fi

if [ "$type" == "f" ]
  then
    echo "Ok, a Functional Component."
fi

echo ""

echo "How is it called?"
read -p " Remember the name should be Upper-Camel-Case (e.g. MyNewComponent): " name

pathname="./src/legacy/$name"

echo ""
echo "Stop! Hammer time!"
echo "=================="
echo ""

# Create path
mkdir $pathname
echo "Created folder for: $name"

# Copy template for Test
cp ./scripts/legacyTemplates/template.test.js $pathname/${name,,}.test.js
sed -i -e "s/{{placeHolderForName}}/$name/g" $pathname/${name,,}.test.js
echo "Created ${name,,}.test.js"

# Copy template for Markdown
cp ./scripts/legacyTemplates/template.md $pathname/$name.md
sed -i -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.md
echo "Created $name.md"

# Copy template Component
if [ "$type" == "c" ]
  then
    cp ./scripts/legacyTemplates/template.c.js $pathname/$name.js
fi

if [ "$type" == "f" ]
  then
    cp ./scripts/legacyTemplates/template.f.js $pathname/$name.js
fi
sed -i -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.js
echo "Created $name.js"

# Copy templates for CSS
cp ./scripts/legacyTemplates/template.module.scss $pathname/$name.module.scss
sed -i -e "s/{{placeHolderForName}}/${name,,}/g" $pathname/$name.module.scss
echo "Created $name.module.scss"

echo ""
echo "OK, we are done! Now start writing code: $pathname/$name.js"
