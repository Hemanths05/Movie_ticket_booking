import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, MapPin, Play } from 'lucide-react';
import { generateShowtimes } from '../utils/generateShowtimes';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [theaters, setTheaters] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getNextDays = (days) => {
    const result = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      result.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
      });
    }
    return result;
  };

  const nextDays = getNextDays(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setSelectedDate(nextDays[0].date);

        const movieRes = await fetch(`http://localhost:5000/api/movies/${id}`);
        const movieData = await movieRes.json();
        if (!movieRes.ok) throw new Error('Movie not found');
        setMovie(movieData);

        const theatersRes = await fetch(`http://localhost:5000/api/theaters?city=Bengaluru`);
        const theatersData = await theatersRes.json();

        const theatersMap = theatersData.reduce((acc, theater) => {
          acc[theater._id] = theater;
          return acc;
        }, {});
        setTheaters(theatersMap);

        const showtimeList = generateShowtimes([movieData], theatersData);
        setShowtimes(showtimeList);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id,nextDays]);

  

  const filteredShowtimes = showtimes.filter(
    st => st.date === selectedDate &&
    (!selectedTheaterId || st.theaterId === selectedTheaterId)
  );

  const showtimesByTheater = {};
  filteredShowtimes.forEach(st => {
    if (!showtimesByTheater[st.theaterId]) {
      showtimesByTheater[st.theaterId] = [];
    }
    showtimesByTheater[st.theaterId].push(st);
  });

  const handleShowtimeSelect = (showtime) => {
    navigate(`/booking/${id}/${showtime.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-gray-900 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl text-white mb-4">Movie not found</h1>
          <Link to="/" className="text-red-500 hover:text-red-400">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen pb-16">
      <div className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end">
            <div className="hidden md:block w-64 h-96 rounded-lg overflow-hidden shadow-2xl -mb-16">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
            </div>

            <div className="md:ml-8 max-w-2xl">
              <div className="flex flex-wrap items-center text-sm text-gray-300 mb-2 gap-4">
                <span className="bg-gray-800 px-2 py-1 rounded">{movie.language}</span>
                {movie.genres.map((genre, index) => (
                  <span key={index} className="bg-gray-800 px-2 py-1 rounded">{genre}</span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{movie.title}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-500 mr-1" />
                  <span className="text-white">{movie.rating}/10</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-400 mr-1" />
                  <span className="text-white">{movie.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-1" />
                  <span className="text-white">{movie.releaseDate}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-none">{movie.description}</p>

              <button className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">
                <Play size={18} className="mr-2" />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 md:pt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Book Tickets</h2>

        <div className="mb-8">
          <h3 className="text-lg text-white mb-3">Select Date</h3>
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {nextDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`flex flex-col items-center p-3 rounded-lg min-w-[70px] transition-colors ${
                  selectedDate === day.date
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-sm">{day.day}</span>
                <span className="text-xl font-semibold">{day.dayNum}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg text-white mb-3">Theaters</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTheaterId(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedTheaterId === null
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Theaters
            </button>
            {Object.values(theaters).map(theater => (
              <button
                key={theater._id}
                onClick={() => setSelectedTheaterId(theater._id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTheaterId === theater._id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {theater.name}
              </button>
            ))}
          </div>
        </div>

        {Object.keys(showtimesByTheater).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(showtimesByTheater).map(([theaterId, theaterShowtimes]) => (
              <div key={theaterId} className="bg-gray-800 rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{theaters[theaterId].name}</h3>
                  <div className="flex items-center text-gray-400 mt-1 md:mt-0">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{theaters[theaterId].location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {theaterShowtimes.map(showtime => (
                    <button
                      key={showtime.id}
                      onClick={() => handleShowtimeSelect(showtime)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                    >
                      {showtime.time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-xl text-gray-400 mb-2">No showtimes available</p>
            <p className="text-gray-500">Try selecting a different date or theater</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
