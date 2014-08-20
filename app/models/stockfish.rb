require 'open3'
module Stockfish
  class InvalidCommand < StandardError; end
  class InvalidOption < StandardError; end

  class Engine
    attr_reader :stdin, :stdout, :stderr, :wait_threads, :version, :pid

    COMMANDS = %w( uci isready setoption ucinewgame position go stop ponderhit quit )

    def initialize(bin_path = "/Users/jackmallers/Downloads/stockfish-5-mac/Mac/stockfish-5-64")
      @stdin, @stdout, @stderr, @wait_threads = Open3.popen3(bin_path)
      @pid = @wait_threads[:pid]
      @version = @stdout.readline.strip
      raise "Not a valid Stockfish binary!" unless @version =~ /^Stockfish/
    end

    def execute(str)
      command = str.split(" ")[0]
      @stdin.puts str
      raise InvalidCommand.new(@stdout.readline.strip) unless COMMANDS.include?(command)
      output = ""
      scores = []
      case command
      when "uci"
        loop do
          output << (line = @stdout.readline)
          break if line =~ /^uciok/
        end
      when "go"
        loop do
          output << (line = @stdout.readline)
          scores << line if line =~ /score/
          break if line =~ /^bestmove/
        end
      when "setoption"
        sleep 0.1
        raise InvalidOption.new(@stdout.readline.strip) if @stdout.ready?
      when "isready"
        output << @stdout.readline
      end
      scores
    end

    def ready?
      execute("isready").strip == "readyok"
    end

    def running?
      @wait_threads.alive?
    end

    def analyze(fen, options)
      execute "position fen #{fen}"
      %w( depth movetime nodes ).each do |command|
        if (x = options[command.to_sym])
          return execute "go #{command} #{x}"
        end
      end
    end

  end
end

