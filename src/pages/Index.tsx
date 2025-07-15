import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');

  const genres = ['Все', 'Экшен', 'RPG', 'Стратегия', 'Симулятор', 'Гонки', 'Спорт'];

  const games = [
    {
      id: 1,
      title: 'Cyberpunk 2077',
      genre: 'RPG',
      size: '70 GB',
      rating: 4.2,
      downloads: '2.1M',
      image: '/img/851f71de-9c8b-4bd6-901b-22427b0511d8.jpg'
    },
    {
      id: 2,
      title: 'The Witcher 3',
      genre: 'RPG',
      size: '35 GB',
      rating: 4.8,
      downloads: '5.3M',
      image: '/img/54e00da4-c667-41cf-8752-6075d1bbfc3a.jpg'
    },
    {
      id: 3,
      title: 'Grand Theft Auto V',
      genre: 'Экшен',
      size: '95 GB',
      rating: 4.5,
      downloads: '8.7M',
      image: '/img/933567fc-82d5-4471-81c9-47c6be391581.jpg'
    },
    {
      id: 4,
      title: 'Civilization VI',
      genre: 'Стратегия',
      size: '12 GB',
      rating: 4.3,
      downloads: '1.8M',
      image: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Euro Truck Simulator 2',
      genre: 'Симулятор',
      size: '8 GB',
      rating: 4.6,
      downloads: '3.2M',
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Forza Horizon 5',
      genre: 'Гонки',
      size: '103 GB',
      rating: 4.7,
      downloads: '4.1M',
      image: '/placeholder.svg'
    },
    {
      id: 7,
      title: 'The Sims 3',
      genre: 'Симулятор',
      size: '6 GB',
      rating: 4.4,
      downloads: '7.2M',
      image: '/img/6cf35e92-5627-4df0-97af-f437573c80c9.jpg'
    },
    {
      id: 8,
      title: 'The Sims 4',
      genre: 'Симулятор',
      size: '18 GB',
      rating: 4.1,
      downloads: '12.5M',
      image: '/img/ddf878b5-c485-4b0c-add8-ebf25d32198f.jpg'
    }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || game.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={32} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">GameCatalog</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Icon name="User" size={24} className="text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск игр..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre)}
                className="rounded-full"
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <p className="text-gray-600">
            Найдено игр: <span className="font-semibold">{filteredGames.length}</span>
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map(game => (
            <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    {game.size}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">{game.title}</CardTitle>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>{game.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <Badge variant="outline">{game.genre}</Badge>
                  <span className="flex items-center space-x-1">
                    <Icon name="Download" size={14} />
                    <span>{game.downloads}</span>
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button className="w-full" size="lg">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать торрент
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Icon name="GamepadIcon" size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Игры не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;