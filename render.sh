for i in output/*.stl; do
  T="${i}__tmp__"
  b=`basename $i`
  echo import\(\"$b\"\)\; > $T
  /Applications/OpenSCAD.app/Contents/MacOS/OpenSCAD -o readme/$b.png --imgsize=400,400 $T
  rm $T
done
