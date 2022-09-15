import logoImg from '../../assets/logo-nlw-esports.png';
import { View, Image, FlatList } from 'react-native';
import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();
  function handleOpenGame() {

    navigation.navigate('game');
  }

  useEffect(( ) => {
    fetch('http://192.168.100.77:3333/games')
    .then(response => response.json())
    .then(data => setGames(data));
  }, []);

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image 
      source={logoImg}
      style={styles.logo}
      />

      <Heading 
      title="Encontre seu duo!"
      subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({item, }) => (
        <GameCard
        data={item}
        onPress={handleOpenGame}
        />
      )}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.contentList}
      />  

    </SafeAreaView>
    </Background>
  );
}