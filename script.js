let fakeText =
  "/nclass Board {/n  private:/n/n  static const int BATTERY_RATE = 40;/n/n  int width = 0;/n  int height = 0;/n  CellContents** cells = nullptr;/n  void deleteCells();/n  public:/n/n  Board(const int width, const int height);/n  Board(const Board& other);/n  Board(Board&& other);/n  ~Board();/n  Board& operator=(const Board& other);/n  Board& operator=(Board&& other);/n/n  void randomize();/n  bool isTraversable(const int x, const int y);/n  void setCell(const int x, const int y, const CellContents newContents);/n  CellContents getCell(const int x, const int y) const;/n  int getWidth();/n  int getHeight();/n/n  friend ostream& operator<<(ostream& out, const Board& board);/n};/nclass Gene {/n  private:/n/n  static const int MUTATION_RATE = 5;/n/n  CellContents north = CellContents::EMPTY;/n  CellContents east = CellContents::EMPTY;/n  CellContents south = CellContents::EMPTY;/n  CellContents west = CellContents::EMPTY;/n  RobotAction action = RobotAction::RANDOM;/n/n  public:/n  Gene();/n  Gene(const Gene& other);/n  Gene& operator=(const Gene& other);/n  void randomize();/n  bool match(const Board& board, const int x, const int y) const;/n  RobotAction getAction() const;/n  friend ostream& operator<<(ostream& out, const Gene& gene);/n};/n/nclass Robot {/n  private:/n/n  static const int STARTING_ENERGY = 5;/n  static const int ENERGY_PER_BATTERY = 5;/n  static const int GENOME_LENGTH = 16;/n/n  vector<Gene> genome;/n  int x = 0;/n  int y = 0;/n  int energy = 0;/n  int totalEnergyCollected = 0;/n/n  void act(Board& board, const RobotAction action);/n/n  public:/n/n  Robot(const bool randomizeGenes = false);/n/n  void init(Board& board);/n  bool move(Board& board);/n  Robot* mate(const Robot& other) const;/n  int getTotalEnergyCollected() const;/n  friend ostream& operator<<(ostream& out, const Robot& robot);/n};/n/nclass SimulationStats {/n  private:/n/n  struct GenStats {/n    int min;/n    int max;/n    double avg;/n    int total;/n  };/n  vector<GenStats> generations;/n  void sampleGenerations(const int width, const int height, double& vertAxisTick, int& horzAxisTick, vector<int>& barHeights) const;/n  public:/n/n  void addGeneration(const vector<Robot*>& robots);/n  void graphStats() const;/n};/nchar cellContentsToChar(const CellContents contents);/nchar robotActionToChar(const RobotAction action);/nCellContents randomCellContents();/nRobotAction randomRobotAction();/nint randomInt(const int min, const int max);/nbool randomBool();/nvoid initFirstGeneration(vector<Robot*>& robots, int num);/nvoid runSimulation(vector<Robot*>& robots);/nvoid breedRobots(vector<Robot*>& robots);/n/nint main() {/n  srand(time(nullptr));/n  const int NUM_ROBOTS = 200;/n  const int NUM_GENERATIONS = 100;/n  vector<Robot*> robots;/n  SimulationStats stats;/n  initFirstGeneration(robots, NUM_ROBOTS);/n  for(int i = 0; i < NUM_GENERATIONS; i++) {/n    runSimulation(robots);/n    stats.addGeneration(robots);/n    breedRobots(robots);/n  }/n/n  stats.graphStats();/n  cin.get();/n  for(int i = 0; i < NUM_ROBOTS; i++) {/n    delete robots[i];/n  }/n  return 0;/n}/n";


let fakeArray = fakeText.split("");
let index = 0;
let lineNumber = 1;
let textToShow = []
let output = document.getElementById("fakeOutput")
let numberColumn = document.getElementById("numberColumn")

document.onkeydown = fakeType;

function fakeType(){
  if(fakeArray[index]==="/"&&fakeArray[index+1]==="n"){
    numberColumn.innerHTML += "<br>" + lineNumber;
    textToShow.push("<br>")
    lineNumber++
    index+=2
    while(fakeArray[index]===" "){
      textToShow.push("&nbsp;")
      index++
    }
  }
  else{
    textToShow.push(fakeArray[index])
    index++
  }
  output.innerHTML = textToShow.join("")
}