<?php

namespace App\Controller;

use App\Entity\Lieu;
use App\Entity\Ville;
use App\Repository\LieuRepository;
use App\Repository\VilleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class LieuController extends AbstractController
{
    private $repository;
    private $manager;

    public function __construct(EntityManagerInterface $manager, LieuRepository $repository)
    {
        $this->repository = $repository;
        $this->manager = $manager;
    }

    /**
     * @Route("/lieu/api", name="lieu_persist", methods={"POST"})
     * @param Request $request
     * @param VilleRepository $repository
     * @param SerializerInterface $serializer
     * @return string
     */
    public function persist(Request $request, VilleRepository $repository, SerializerInterface $serializer) {
        // Getting the data from the JSON.
        $json = json_decode($request->getContent());
        $id = array_key_exists("id", $json) ? $id = $json->id : null;
        $nom = $json->nom;
        $rue = $json->rue;
        $ville = $repository->find(intval($json->ville));
        $latitude = doubleval($json->latitude);
        $longitude = doubleval($json->longitude);

        // Checking if the entity exists and creating a new one if not.
        $lieu = $id ? $this->repository->find($json->id) : new Lieu();
        $lieu->setNom($nom);
        $lieu->setRue($rue);
        $lieu->setVille($ville);
        if ($latitude) { $lieu->setLatitude($latitude); }
        if ($longitude) { $lieu->setLongitude($longitude); }

        // Persisting the entity.
        $this->manager->persist($lieu);
        $this->manager->flush();

        // Returning a JSON Response.
        $response = new Response();
        $response->headers->set("Content-Type", "application/json");
        $response->setContent($serializer->serialize($lieu, "json", ["groups" => "lieu"]));
        return $response;
    }
}
