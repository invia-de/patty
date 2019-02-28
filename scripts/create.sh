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
echo "Is it an [atom], a [molecule], an [organism], a [layout] or an [utility] component?"
read -p " Type [a], [m], [o], [l] or [u]: " folder
echo ""

foldername="atoms"

if [ "$folder" == "a" ]
  then
    echo "Ok, an Atom Component."
fi

if [ "$folder" == "m" ]
  then
    foldername="molecules"
    echo "Ok, a Molecule Component."
fi

if [ "$folder" == "o" ]
  then
    foldername="organisms"
    echo "Ok, an Organism Component."
fi

if [ "$folder" == "l" ]
  then
    foldername="layout"
    echo "Ok, a Layout Component."
fi

if [ "$folder" == "u" ]
  then
    foldername="utilities"
    echo "Ok, a utility component."
fi

echo ""

echo "Should your component be CSS- oder Sass-based?"
read -p " Type [c] for CSS or [s] for SASS: " precomp
echo ""

precompiler="css"

if [ "$precomp" == "c" ]
  then
    echo "Ok, CSS."
fi

if [ "$precomp" == "s" ]
  then
    precompiler="scss"
    echo "Ok, SASS."
fi

echo ""

echo "How is it called?"
read -p " Remember the name should be Upper-Camel-Case (e.g. MyNewComponent): " name

pathname="./src/components/$foldername/$name"
lowername=$(echo $name| tr "[A-Z]" "[a-z]")
stylefile=$lowername.$precompiler

echo ""
echo "Stop! Hammer time!"
echo "=================="
echo ""

# Create path
mkdir $pathname
echo "Created folder for: $name"

# Copy template for Test
cp ./scripts/templates/template.test.js $pathname/$name.test.js
sed -i.bak -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.test.js
rm $pathname/$name.test.js.bak
echo "Created $name.test.js"

# Copy template for Markdown
cp ./scripts/templates/template.md $pathname/$name.md
sed -i.bak -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.md
rm $pathname/$name.md.bak
echo "Created $name.md"

# Copy template Component
if [ "$type" == "c" ]
  then
    cp ./scripts/templates/template.c.js $pathname/$name.js
fi

if [ "$type" == "f" ]
  then
    cp ./scripts/templates/template.f.js $pathname/$name.js
fi
sed -i.bak -e "s/{{placeHolderForPrecompiler}}/$stylefile/g" $pathname/$name.js
sed -i.bak -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.js
sed -i.bak -e "s/{{placeHolderForName}}/$name/g" $pathname/$name.js
rm $pathname/$name.js.bak
echo "Created $name.js"

# Copy templates for CSS/SASS
cp ./scripts/templates/template.$precompiler $pathname/$stylefile
sed -i.bak -e "s/{{placeHolderForName}}/$lowername/g" $pathname/$stylefile
rm $pathname/$stylefile.bak
echo "Created $stylefile"

echo ""
echo "OK, we are done! Now start writing code: $pathname/$name.js"
echo "Don't forget to add your new component $name ($pathname/$name) to the index.js!"
