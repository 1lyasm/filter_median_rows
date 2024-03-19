function createMedianResultsSheet() {
  function compute_median(numbers) {
    Logger.log("Numbers: " + numbers);

    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    Logger.log("Sorted: " + sorted)

    Logger.log("middle: " + middle);

    var median = -1;

    if (sorted.length % 2 === 0) {
      median = (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
      median = sorted[middle];
    }

    Logger.log("median: " + median);

    Logger.log("Exiting...");

    return median;
}

function createResultGroupArray(allResultsData, currentIndex, AVG_SCORE_INDEX, MEDIAN_WINDOW) {
  resultGroup = []

  for (var i = 0; i < MEDIAN_WINDOW; i++) {
    resultGroup.push(allResultsData[currentIndex + i][AVG_SCORE_INDEX]);
  }

  return resultGroup;
}

function updateMedianResultsData(allResultsData, currentIndex, median, AVG_SCORE_INDEX, MEDIAN_WINDOW, medianResultsData) {
  EPSILON = 0.0001

  for (var i = currentIndex; i < currentIndex + MEDIAN_WINDOW; i++) {
    if (Math.abs(allResultsData[i][AVG_SCORE_INDEX] - median) < EPSILON) {
      Logger.log("taking " + allResultsData[i][AVG_SCORE_INDEX]);

      medianResultsData.push(allResultsData[i]);
      break;
    }
  }
}

  var MEDIAN_WINDOW = 3;
  var AVG_SCORE_INDEX = 12;
  var DATA_START_INDEX = 1;

  var allResultsSheet = SpreadsheetApp.getActive().getSheetByName('AllResults');
  var medianResultsSheet = SpreadsheetApp.getActive().getSheetByName('MedianResults');
  var allResultsData = allResultsSheet.getDataRange().getValues();
  var medianResultsData = [];

  medianResultsSheet.clearContents();

  medianResultsData.push(allResultsData[0]);

  for (var i = DATA_START_INDEX; i < allResultsData.length; i += MEDIAN_WINDOW) {
    var resultGroup = createResultGroupArray(allResultsData, i, AVG_SCORE_INDEX, MEDIAN_WINDOW);
    var median = compute_median(resultGroup);
    Logger.log("median: " + median);
    updateMedianResultsData(allResultsData, i, median, AVG_SCORE_INDEX, MEDIAN_WINDOW, medianResultsData);
  }

  for (var i = 0; i < medianResultsData.length; i++) {
    medianResultsSheet.appendRow(medianResultsData[i]);
  }
}
