import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./../styles/Home.module.css";
interface IPokemon {
  name: string;
  id: number;
  image: string;
}
const Home: NextPage = () => {
  const mainURL = "https://jherr-pokemon.s3.us-west-1.amazonaws.com";
  const [pokemon, setPokemon] = useState<IPokemon[] | undefined>([]);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(`${mainURL}/index.json`);
      setPokemon(await resp.json());
    }
    getPokemon();
  }, []);

  return (
    <div className={styles["home"]}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h1 className={styles["title"]}>Pokemon List</h1>
      <div className={styles["grid"]}>
        {pokemon !== undefined &&
          pokemon.map((pokemon) => {
            return (
              <div className={styles["card"]} key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <a>
                    <img
                      src={`${mainURL}/${pokemon.image}`}
                      alt={pokemon.name}
                    />
                    <h3>{pokemon.name}</h3>
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
