#!/bin/bash

directory="./dist/public/"

html_files=$(find "$directory" -type f -name "*.html")

file_array=()
for file in $html_files; do
    filename=$(basename "$file")
    filename_without_extension="${filename%.*}"
    file_array+=("\"$filename_without_extension\"")
done

json_file="./dist/public/src/html_files.json"
json_content=$(printf '%s\n' "${file_array[@]}" | awk '{printf "%s%s",sep,$0; sep=","}') 
echo "{ \"titles\": [${json_content}] }" > "$json_file"

echo "Se ha creado el archivo JSON \"$json_file\" con los nombres de los archivos HTML en \"$directory\"."