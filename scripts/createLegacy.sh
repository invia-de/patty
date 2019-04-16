#!/bin/bash

echo ""

echo "Component Creation Script"
echo "========================="

echo ""

echo "Which type of Component do you want to create?"
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

lowername=$(echo $name| tr "[A-Z]" "[a-z]")

# Copy template for Test
cp ./scripts/legacyTemplates/template.test.js $pathname/$name.test.js
sed -i.bak -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.test.js
rm $pathname/$name.test.js.bak
echo "Created $name.test.js"

# Copy template for Markdown
cp ./scripts/legacyTemplates/template.md $pathname/$name.md
sed -i.bak -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.md
rm $pathname/$name.md.bak
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
sed -i.bak -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.js
sed -i.bak -e "s/{{placeHolderForPrecompiler}}/$lowername/g" $pathname/$name.js
rm $pathname/$name.js.bak
echo "Created $name.js"

# Copy templates for SCSS
cp ./scripts/legacyTemplates/template.module.scss $pathname/$lowername.module.scss
sed -i.bak -e "s/{{placeHolderForName}}/$lowername/g" $pathname/$lowername.module.scss
rm $pathname/$lowername.module.scss.bak
echo "Created $lowername.module.scss"

echo ""
echo "OK, we are done! Now start writing code: $pathname/$name.js"
