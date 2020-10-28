<?php

namespace App\Repository;

use App\Entity\Sortie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Sortie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sortie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sortie[]    findAll()
 * @method Sortie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SortieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sortie::class);
    }

    public function findByParameters($id, $nom, $campus, $from, $to, $isOrganisateur, $isInscrit, $isNotInscrit, $isFinie)
    {
        $query = $this->createQueryBuilder("s")
            ->andWhere("s.nom LIKE :nom")->setParameter("nom", "%$nom%");
        if ($campus) { $query->andWhere("s.siteOrganisateur = :campus")->setParameter("campus", $campus); }
        if ($from) { $query->andWhere("s.dateHeureDebut >= :debut")->setParameter("debut", $from); }
        if ($to) { $query->andWhere("s.dateHeureDebut <= :fin")->setParameter("fin", $to); }
        if ($isOrganisateur) { $query->andWhere("s.organisateur = :organisateur")->setParameter("organisateur", $id); }
        if ($isInscrit) { $query->andWhere(":isInscrit MEMBER OF s.participants")->setParameter("isInscrit", $id); }
        if ($isNotInscrit) { $query->andWhere(":isNotInscrit NOT MEMBER OF s.participants")->setParameter("isNotInscrit", $id);; }
        if ($isFinie) { $query->andWhere("s.etat = :etat")->setParameter("etat", 5); }

        return $query->getQuery()->getResult();
    }

    // /**
    //  * @return Sortie[] Returns an array of Sortie objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Sortie
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
