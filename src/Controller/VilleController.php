<?php

namespace App\Controller;

use App\Entity\Ville;
use App\Repository\VilleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VilleController extends AbstractController
{
    private $repository;
    private $manager;

    public function __construct(EntityManagerInterface $manager, VilleRepository $repository)
    {
        $this->repository = $repository;
        $this->manager = $manager;
    }

    /**
     * @Route("/admin/villes", name="villes_display")
     * @param Request $request
     * @return Response
     */
    public function display(Request $request) {
        return $this->render("ville/villes.html.twig");
    }

    /**
     * @Route("/villes/api", name="villes_list", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function list(Request $request) {
        $nom = $request->get("nom");
        $villes = $this->repository->findByNomLike($nom);
        return $this->json($villes);
    }

    /**
     * @Route("/admin/villes/api", name="villes_persist", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function persist(Request $request) {
        // Getting the data from the JSON.
        $json = json_decode($request->getContent());
        $id = array_key_exists("id", $json) ? $json->id : null;
        $nom = $json->nom;
        $codePostal = $json->codePostal;

        // Checking if the entity exists and creating a new one if not.
        $ville = $id ? $this->repository->find($id) : new Ville();
        $ville->setNom($nom);
        $ville->setCodePostal($codePostal);

        // Persisting the entity.
        $this->manager->persist($ville);
        $this->manager->flush();

        // Returning a JSON Response.
        return $this->json($ville);
    }

    /**
     * @Route("/admin/villes/api/{id}", name="villes_remove", requirements={"id": "\d+"}, methods={"DELETE"})
     * @param $id
     * @param Request $request
     * @return Response
     */
    public function remove($id, Request $request) {
        $ville = $this->repository->find($id);
        $this->manager->remove($ville);
        $this->manager->flush();
        return $this->json($ville);
    }
}
