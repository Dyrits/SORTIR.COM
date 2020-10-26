<?php

namespace App\Entity;

use App\Repository\LieuRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=LieuRepository::class)
 */
class Lieu
{
    /**
     * @Groups({"sortie", "lieu"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups("lieu")
     * @ORM\Column(type="string", length=255)
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank(message="Veuillez remplir le champs requis avec le nom du lieu.")
     * @Assert\Length(min="3", max="100")
     * @Assert\Type("string")
     */
    private $nom;

    /**
     * @Groups("lieu")
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min="3", max="100")
     * @Assert\Type("string")
     */
    private $rue;

    /**
     * @Groups("lieu")
     * @ORM\ManyToOne(targetEntity=Ville::class, inversedBy="lieus", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Assert\Length(min="2", max="100")
     * @Assert\Type("string")
     */
    private $ville;

    /**
     * @Groups("lieu")
     * @ORM\Column(type="float", nullable=true)
     * @Assert\Type(type="float", message="Veuillez insérer une latitude.")
     * @Assert\Range(min = 10, max = 30,
     *     minMessage = "Vous devez insérer une latitude de {{ limit }} caractères minimum.",
     *     maxMessage = "Vous devez insérer une latitude de {{ limit }} caractères maximum.")
     */
    private $latitude;

    /**
     * @Groups("lieu")
     * @ORM\Column(type="float", nullable=true)
     * @Assert\Type(type="float",message="Veuillez insérer une longitude.")
     * @Assert\Range(min = 10, max = 30,
     *     minMessage = "Vous devez insérer une longitude de {{ limit }} caractères minimum.",
     *     maxMessage = "Vous devez insérer une longitude de {{ limit }} caractères maximum.")
     * @TODO : A voir si cet assert est ok : format d'une latitude/longitude
     */
    private $longitude;

    /**
     * @ORM\OneToMany(targetEntity=Sortie::class, mappedBy="lieu")
     */
    private $sorties;

    public function __construct()
    {
        $this->sorties = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getRue(): ?string
    {
        return $this->rue;
    }

    public function setRue(string $rue): self
    {
        $this->rue = $rue;

        return $this;
    }

    public function getVille(): ?Ville
    {
        return $this->ville;
    }

    public function setVille(?Ville $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return Collection|Sortie[]
     */
    public function getSorties(): Collection
    {
        return $this->sorties;
    }

    public function addSortie(Sortie $sortie): self
    {
        if (!$this->sorties->contains($sortie)) {
            $this->sorties[] = $sortie;
            $sortie->setLieu($this);
        }

        return $this;
    }

    public function removeSortie(Sortie $sortie): self
    {
        if ($this->sorties->contains($sortie)) {
            $this->sorties->removeElement($sortie);
            // set the owning side to null (unless already changed)
            if ($sortie->getLieu() === $this) {
                $sortie->setLieu(null);
            }
        }

        return $this;
    }

    public function getLabel() {
        $label = $this->ville->getLabel()." - $this->rue | $this->nom";
        if ($this->latitude && $this->longitude) { $label = $label." | $this->latitude & $this->longitude"; }
        return $label;
    }
}
