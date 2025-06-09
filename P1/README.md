# Part 1 - Word Frequency

The task is to write a well-documented Python program to print the top 10th to 20th words in [The Art of Public Speaking](https://www.gutenberg.org/cache/epub/16317/pg16317.txt) by frequency. Third party libraries are not allowed.

## Sample output

```
Words ranked from 10th to 20th by frequency:
you: 1500
for: 1300
as: 1200
be: 1100
not: 1050
he: 1000
with: 900
his: 800
are: 700
i: 600
```

## Source Data

The source file contains the contents of a free ebook from [Project Gutenberg](https://www.gutenberg.org) titled [The Art of Public Speaking](https://www.gutenberg.org/cache/epub/16317/pg16317.txt). It contains plain text in UTF-8 encoding.

## Solution

To fetch data from the URL source, we can make use of the built-in `urllib` library to send a request to the URL. The request expects a response object that contains the raw binary data to be returned. To read this binary data, we can use the built-in `read()` method and decode it into human-readable Unicode characters using the `decode("utf-8")` method.

```python
url = "https://www.gutenberg.org/cache/epub/16317/pg16317.txt"
response = urllib.request.urlopen(url)
data = response.read().decode("utf-8")
```

To remove punctuation from the text data, we can use the built-in `re` library to create a regular expression pattern that matches all punctuation characters and replace them with a space using the `sub()` method. These these spaces are important to serve as delimiters to separate words.

```python
punctuation_pattern: str = '[' + re.escape(pattern=string.punctuation) + ']'
cleaned_data: str = re.sub(punctuation_pattern, ' ', data)
```

To convert the data to lowercase, we can use the built-in `lower()` method on the string object.

```python
lowercase_data: str = cleaned_data.lower()
```

To split the data into words, we can use the built-in `split()` method.

```python
words: list[str] = list(filter(None, re.split(r'\s+', lowercase_data)))
```

To count the frequency of each word, we can use the built-in `defaultdict` class from the `collections` module.

```python
word_counts: defaultdict[Any, int] = defaultdict(int)
for word in words:
    word_counts[word] += 1
```

To sort the dictionary items by count in descending order, we can use the built-in `sorted()` function with a lambda function as the key argument.

```python
sorted_word_counts: list[tuple[Any, int]] = sorted(word_counts.items(), key=lambda item: item[1], reverse=True)
```

To print the top 10th to 20th words in frequency, we can use a for loop to iterate over the sorted list and print the word and count.

```python
for word, count in sorted_word_counts[9:20]:
    print(f"{word}: {count}")
```

## Full Program

The code for the full Python program can be found in [main.py](./main.py). It uses a [config.ini](./config.ini) file to store the configuration parameters and a logger to log the program's execution in a log file.

If the program executes successfully, the defined range of top most frequent words will be printed to the console.

### Configuration Parameters

The [config.ini](./config.ini) file contains the following configuration parameters:

- `logging_level`: The logging level to use. Default is `INFO`.
- `log_file`: The name of the log file to write logs to. Default is `word_frequency.log` which is saved in the same directory as the main program.
- `process_mode`: The mode of processing which can be either `line` or `all`. Default is `line`.
- `url`: The URL to fetch data from. Default is `https://www.gutenberg.org/cache/epub/16317/pg16317.txt`.
- `start_idx`: The starting index for the words to be printed. Default is `9` which corresponds to the 10th most frequent word.
- `end_idx`: The ending index for the words to be printed (exclusive). Default is `20`, which means that only words up to and including the 19th index (20th most frequent word) will be printed.

**Note**:
- The option to specify a process_mode of `line` or `all` allows the user to choose how the incoming data should be processed. 
- The `line` option is more memory efficient as it processes the data line by line, while the `all` option processes the data all at once. The tradeoff is that processing data line by line introduces additional complexity as each line needs to be decoded and processed separately.
- The `line` option can also be useful to process data that is streaming from a remote source.

### Instructions

To run the program, please install an appropriate version of Python. The latest v3.13.4 stable version of Python released in 3rd June 2025 should work.

Execute the following command in the terminal:

```bash
cd P1
python main.py
```