import logging
import os
import re
import string
import urllib.request
from collections import defaultdict
from configparser import ConfigParser
from logging import Logger
from typing import Any, Iterator


def setup_environment() -> tuple[ConfigParser, Logger]:
    """
    Setup the environment by reading the configuration file and setting up the logging.

    Returns:
        A tuple containing:
            - config (ConfigParser): The initialized ConfigParser object.
            - logger (logging.Logger): The initialized logger instance.
    """

    config: ConfigParser = ConfigParser()
    config_path: str = os.path.join(os.path.dirname(__file__), "config.ini")
    config.read(filenames=config_path)

    logging_level_str: str = config["DEFAULT"].get("logging_level", "INFO").upper()
    logging_level: Any | int = getattr(logging, logging_level_str, logging.INFO)

    log_file: str = config["DEFAULT"].get("log_file", "word_frequency.log")
    log_file_path: str = os.path.join(os.path.dirname(__file__), log_file)

    logging.basicConfig(
        level=logging_level,
        format="%(asctime)s - %(levelname)s - %(message)s",
        filename=log_file_path,
        filemode='a'
    )
    logger: Logger = logging.getLogger(name=__name__)
    return config, logger


def fetch_url_content(url: str, logger: logging.Logger) -> Any:
    """
    Fetches content from a given URL.

    Args:
        url (str): The URL to fetch.
        logger (logging.Logger): The logger instance for logging messages.

    Returns:
        Any: The response object from urllib.request.urlopen if successful.

    Raises:
        SystemExit: If the URL cannot be opened.
    """

    try:
        response = urllib.request.urlopen(url)
        logger.info(msg=f"Successfully opened URL: {url}")
        return response
    except urllib.error.URLError as e:
        logger.error(msg=e)
        logger.error(msg=f"Failed to open URL: {url}")
        exit(code=1)  # Exit the program if the URL cannot be opened


def count_words(
    response: Any, process_mode: str, logger: logging.Logger
) -> defaultdict[Any, int]:
    """
    Counts words from the response, handling both 'line' and 'all' processing modes.

    Args:
        response (Any): The response object from urllib.request.urlopen.
        process_mode (str): The mode of processing ('line' or 'all').
        logger (logging.Logger): The logger instance for logging messages.

    Returns:
        defaultdict[Any, int]: A defaultdict containing word counts.
    """

    word_counts: defaultdict[Any, int] = defaultdict(int)
    punctuation_pattern: str = "[" + re.escape(pattern=string.punctuation) + "]"

    logger.info(msg="Starting word count processing.")
    if process_mode == "line":
        logger.info(msg="Processing line by line...")
        for line in response:
            line_decoded = line.decode("utf-8")
            cleaned_line: str = re.sub(punctuation_pattern, " ", line_decoded)
            lowercase_line: str = cleaned_line.lower()
            words: Iterator[str] = filter(None, re.split(r"\s+", lowercase_line))
            for word in words:
                word_counts[word] += 1
        logger.info(msg="Completed line-by-line processing.")
    else:
        logger.info(msg="Processing all at once...")
        data = response.read().decode("utf-8")
        cleaned_data: str = re.sub(punctuation_pattern, " ", data)
        lowercase_data: str = cleaned_data.lower()
        words: Iterator[str] = filter(None, re.split(r"\s+", lowercase_data))
        for word in words:
            word_counts[word] += 1
        logger.info(msg="Completed all-at-once processing.")
    return word_counts


def print_word_counts(
    word_counts: defaultdict[Any, int], logger: Logger, start_idx: int, end_idx: int
) -> None:
    """
    Sorts word counts and prints the words ranked from start_idx to end_idx by frequency.

    Args:
        word_counts (defaultdict[Any, int]): A defaultdict containing word counts.
        logger (Logger): The logger instance for logging messages.
        start_idx (int): The starting index for printing.
        end_idx (int): The ending index for printing (exclusive).
    """
    logger.info(msg="Processing complete. Sorting word counts by frequency.")
    logger.debug(msg=f"Word counts before sorting: {word_counts}")

    sorted_word_counts: list[tuple[Any, int]] = sorted(
        word_counts.items(), key=lambda item: item[1], reverse=True
    )
    logger.info(msg="Sorting complete. Preparing to print results.")
    logger.debug(msg=f"Sorted word counts: {sorted_word_counts}")

    print(f"Words ranked from {start_idx + 1}th to {end_idx}th by frequency:")
    for word, count in sorted_word_counts[start_idx:end_idx]:
        print(f"{word}: {count}")


if __name__ == "__main__":
    config, logger = setup_environment()
    logger.info(msg="Config and Logger initialized.")

    logger.info(msg="Retrieving configuration parameters...")
    url: str = config["DEFAULT"]["url"]
    process_mode: str = config["DEFAULT"].get("process_mode", "all").lower()
    start_idx: int = int(config["DEFAULT"].get("start_idx", 9))
    end_idx: int = int(config["DEFAULT"].get("end_idx", 20))
    logger.info(msg="Configuration parameters retrieved.")

    logger.info(msg="Fetching URL content...")
    response = fetch_url_content(url, logger)
    logger.info(msg="URL content fetched.")

    logger.info(msg="Counting words...")
    word_counts: defaultdict[Any, int] = count_words(response, process_mode, logger)
    logger.info(msg="Word counts computed.")

    logger.info(msg="Printing word counts...")
    print_word_counts(word_counts, logger, start_idx, end_idx)
    logger.info(msg="Word counts printed.")