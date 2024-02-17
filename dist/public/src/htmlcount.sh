#!/bin/bash

directory="./pages/"

html_files=$(find "$directory" -type f -name "*.html")

file_array=()
for file in $html_files; do
    filename=$(basename "$file")
    filename_without_extension="${filename%.*}"
    # Replace underscores with spaces
    title=$(echo "$filename_without_extension" | sed 's/_/ /g')
    file_array+=("{\"title\":\"$title\"}")
done

json_file="./src/html_files.json"
json_content=$(printf '%s\n' "${file_array[@]}" | awk '{printf "%s%s",sep,$0; sep=","}') 
echo "[ ${json_content} ]" > "$json_file"

echo "Se ha creado el archivo JSON \"$json_file\" con los nombres de los archivos HTML en \"$directory\"."