var Game = function() {
  // Game logic and initialization here
  //add rando first value
  this.matrix = [
    {col:0, row:0, val:"" },
    {col:1, row:0, val:"" },
    {col:2, row:0, val:"" },
    {col:3, row:0, val:"" },
    {col:0, row:1, val:"" },
    {col:1, row:1, val:"" },
    {col:2, row:1, val:"" },
    {col:3, row:1, val:"" },
    {col:0, row:2, val:"" },
    {col:1, row:2, val:"" },
    {col:2, row:2, val:"" },
    {col:3, row:2, val:"" },
    {col:0, row:3, val:"" },
    {col:1, row:3, val:"" },
    {col:2, row:3, val:"" },
    {col:3, row:3, val:"" }
  ]

  this.score = 0

  var initialSquare = this.matrix[Math.floor(Math.random()*this.matrix.length)];
  // console.log(initialSquare)

  const initialValues = [2, 4]
  initialSquare['val'] = initialValues[Math.floor(Math.random()*initialValues.length)];
  // console.log(initialSquare)
};



Game.prototype.moveTile = function(tile, direction, matrix, game) {
  // Game method here

  switch(direction) {
    case 38: //up
      console.log('up');
      // MOVING COLUMNS (UP)
      for (let c = 0; c<4; c++) {
        let modTiles = []
        var this_col = matrix.filter(function(x) {return x['col'] == c})
        // console.log(this_col) //works!!
        for (var r = 1; r < 4; r++) {
          if (this_col[r]["val"] != "") { //do this whenver you find a tile with a number
            let currentTile = this_col[r]["val"]
            for (var s = r-1; s > -1; s--) {
              if (this_col[s]["val"] == "") { //if the tile above is empty, swap the values
                this_col[s]["val"] = currentTile
                this_col[s+1]["val"] = ""
              } else if (this_col[s]["val"] == this_col[s+1]["val"] && modTiles.includes(this_col[s+1]) == false) {
                this_col[s]["val"] = currentTile * 2
                updateScore(game, (currentTile * 2))
                this_col[s+1]["val"] = ""
                modTiles.push(this_col[s])
                // console.log(modTiles)
              }
            }
          }
        }
      }
      randomTile(game)
      render(game)

      break;
    case 40: //down
      console.log('down');
      // MOVING COLUMNS (DOWN)
      for (let c = 0; c<4; c++) { //doing it for each column
        let modTiles = []
        var this_col = matrix.filter(function(x) {return x['col'] == c})
        // console.log(this_col) //works!!
        for (var r = 2; r > -1 ; r--) {
          if (this_col[r]["val"] != "") { //do this whenver you find a tile with a number
            let currentTile = this_col[r]["val"]
            for (var s = r+1; s < 4; s++) {
              if (this_col[s]["val"] == "") { //if the tile above is empty, swap the values
                this_col[s]["val"] = currentTile
                this_col[s-1]["val"] = ""
              } else if (this_col[s]["val"] == this_col[s-1]["val"] && modTiles.includes(this_col[s-1]) == false) {
                this_col[s]["val"] = currentTile * 2
                updateScore(game, (currentTile * 2))
                this_col[s-1]["val"] = ""
                modTiles.push(this_col[s])
                // console.log(modTiles)
              }
            }
          }
        }
      }
      randomTile(game)
      render(game)


      break;
    case 39: //right
      console.log('right');
      //MOVING ROWS RIGHT
      for (let r = 0; r<4; r++) { //doing it for each column
        let modTiles = []
        var this_row = matrix.filter(function(x) {return x['row'] == r})
        // console.log(this_row) //works!!
        for (var c = 2; c > -1 ; c--) {
          if (this_row[c]["val"] != "") { //do this whenver you find a tile with a number
            let currentTile = this_row[c]["val"]
            for (var s = c+1; s < 4; s++) {
              if (this_row[s]["val"] == "") { //if the tile above is empty, swap the values
                this_row[s]["val"] = currentTile
                this_row[s-1]["val"] = ""
              } else if (this_row[s]["val"] == this_row[s-1]["val"] && modTiles.includes(this_row[s-1]) == false) {
                // console.log("1")
                this_row[s]["val"] = currentTile * 2
                updateScore(game, (currentTile * 2))
                this_row[s-1]["val"] = ""
                modTiles.push(this_row[s])
                // console.log(modTiles)
              }
            }
          }
        }
      }
      randomTile(game)
      render(game)

      break;
    case 37: //left
      console.log('left');
      //MOVING ROWS LEFT
      for (let r = 0; r<4; r++) {
        let modTiles = []
        var this_row = matrix.filter(function(x) {return x['row'] == r})
        // console.log(this_row) //works!!
        for (var c = 1; c < 4; c++) {
          if (this_row[c]["val"] != "") { //do this whenver you find a tile with a number
            let currentTile = this_row[c]["val"]
            for (var s = c-1; s > -1; s--) {
              if (this_row[s]["val"] == "") { //if the tile above is empty, swap the values
                this_row[s]["val"] = currentTile
                this_row[s+1]["val"] = ""
              } else if (this_row[s]["val"] == this_row[s+1]["val"] && modTiles.includes(this_row[s+1]) == false) {
                // console.log("1")
                this_row[s]["val"] = currentTile * 2
                updateScore(game, (currentTile * 2))
                this_row[s+1]["val"] = ""
                modTiles.push(this_row[s])
                // console.log(modTiles)
              }
            }
          }
        }
      }
      randomTile(game)
      render(game)
      break;
  }

};

//FUNCTION THAT RENDERS
// <div class="tile" data-row="r2", data-col="c2" data-val="4">4</div>
function render(game) {
  var tilex = $(".tile") //al 16 of them

  for (var i=0, max=tilex.length; i < max; i++) {
     // Do something with the element here
    //  console.log(tilex[i])
    //  console.log(game.matrix[i])
     tilex[i].dataset.row = "r" + (game.matrix[i]['row']).toString()
     tilex[i].dataset.col = "c" + (game.matrix[i]['col']).toString()
     tilex[i].dataset.val = game.matrix[i]['val']
     tilex[i].innerHTML = game.matrix[i]['val']
  }
  checkWin(game)
//
}

function randomTile(game) {
  availableSquares = game.matrix.filter(function(x) {return x['val'] == ""})
  if (availableSquares.length == 0) {
    console.log("Can't add a random tile")
    if (checkLose(game) == true) {
      console.log("YOU LOST!!")
    }
  } else {
  var emptySquare = availableSquares[Math.floor(Math.random()*availableSquares.length)];
  const initialValues = [2, 4]
  emptySquare['val'] = initialValues[Math.floor(Math.random()*initialValues.length)];
  // console.log(initialSquare)
  console.log(emptySquare)
  }
}

function checkLose(game) {
  // Check all the ROWS
  for (let r = 0; r<4; r++) {
    var this_row = game.matrix.filter(function(x) {return x['row'] == r})
    // console.log("Checking Row:", r)
    for (var c = 0; c < 3; c++) { //index for each of the tiles in the row
      if (this_row[c]["val"] == this_row[c+1]["val"]) {
        console.log("You can still collide some tiles, haven't lost")
        return false
      }
    }
  }

  // Check all COLUMNS
  for (let c = 0; c<4; c++) {
    var this_col = game.matrix.filter(function(x) {return x['col'] == c})
    // console.log("Checking Col:", c)
    for (var r = 0; r < 3; r++) { //index for each of the tiles in the row
      // console.log("Comparing", this_col[r]["val"], "against", this_col[r+1]["val"])
      if (this_col[r]["val"] == this_col[r+1]["val"]) {
        console.log("You can still collide some tiles, haven't lost")
        return false
      }
    }
  }

  //If it never returned false, then you lost the game: return true
  console.log("You cannot collide any more tiles...")
  showLose(game)
  return true
}


function checkWin(game) {
  game.matrix.forEach( function (object) {
    var x = object.prop1 + 2;
    if (object['val'] == 2048) {
      showWin(game)
    };
  });
}

function updateScore(game, pointsToAdd) {
  game.score = game.score + pointsToAdd
  showScore(game)
}

function showLose(game) {
  document.getElementById("youlose").innerHTML = "YOU LOSE!!!";
}

function showWin(game) {
  document.getElementById("youwin").innerHTML = "YOU WIN!!!";
}

function showScore(game) {
  document.getElementById("score").innerHTML =game.score;
}


$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  render(game)

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which, game.matrix, game);
    }
  });

});
